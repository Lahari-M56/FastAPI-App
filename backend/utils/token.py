from datetime import datetime, timedelta
import os
from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from jose import jwt
from sqlalchemy.orm import Session
from database import get_db
from models.users import Users

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(hours=2)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return encoded_jwt


def verify_token(token: str, db: Session):
    to_decode=jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    current_user = db.query(Users).filter(Users.id == to_decode.get("user_id")).first()
    if current_user is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    return current_user
