from pwdlib import PasswordHash
import re
from fastapi import HTTPException

# Argon2id hashing
password_hash = PasswordHash.recommended()

# Hash password
def get_password_hash(password: str) -> str:
    return password_hash.hash(password)

# Verify password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plain_password, hashed_password)

# Validate password strength
def validate_password(password: str):
    if len(password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters")
    if not re.search(r"[0-9]", password):
        raise HTTPException(status_code=400, detail="Password must contain a number")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        raise HTTPException(status_code=400, detail="Password must contain a special character")
