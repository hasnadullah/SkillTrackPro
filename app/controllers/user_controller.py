from fastapi import HTTPException
from app.services.user_service import (
    create_user_service,
    get_user_by_email_service
)
from app.auth.jwt_handler import create_access_token
from app.utils.security import get_password_hash, verify_password, validate_password
from app.config.db import users_collection  # Needed to update MongoDB

def signup_controller(user_data):
    # Validate password strength
    validate_password(user_data.password)

    # Hash the password before saving
    hashed_pwd = get_password_hash(user_data.password)
    user_dict = user_data.dict()
    user_dict["password"] = hashed_pwd

    result = create_user_service(user_dict)
    if not result:
        raise HTTPException(status_code=400, detail="Email already exists")
    return {"message": "User created successfully"}

def login_controller(user_data):
    db_user = get_user_by_email_service(user_data.email)

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Check if password is plain text (existing user)
    if db_user["password"] == user_data.password:
        # Password is plain text -> hash and update
        hashed_pwd = get_password_hash(user_data.password)
        users_collection.update_one(
            {"_id": db_user["_id"]}, {"$set": {"password": hashed_pwd}}
        )
        db_user["password"] = hashed_pwd  # Update local variable

    # Verify password
    if not verify_password(user_data.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    # Create JWT token
    token = create_access_token({
        "user_id": str(db_user["_id"]),
        "role": db_user["role"]
    })

    return {
        "token": token,
        "role": db_user["role"],
        "name": db_user["name"],
        "email": db_user["email"]
    }
