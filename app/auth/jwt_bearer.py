from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer
from .jwt_handler import decode_access_token

class JWTBearer(HTTPBearer):
    def __init__(self, roles: list = []):
        super(JWTBearer, self).__init__()
        # Normalize allowed roles to lowercase
        self.roles = [r.lower() for r in roles]

    async def __call__(self, request: Request):
        credentials = await super(JWTBearer, self).__call__(request)
        token = credentials.credentials

        payload = decode_access_token(token)

        if payload is None:
            raise HTTPException(status_code=403, detail="Invalid token")

        # Normalize received role to lowercase
        user_role = payload.get("role", "").lower()

        # Check authorization
        if self.roles and user_role not in self.roles:
            raise HTTPException(status_code=403, detail="Not authorized for this role")

        return payload
