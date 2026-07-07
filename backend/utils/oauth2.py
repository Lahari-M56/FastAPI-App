from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from database import get_db
from models.users import User
from utils.token import verify_access_token

# Must match your login endpoint
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    print("TOKEN:", token)

    payload = verify_access_token(token)
    print("PAYLOAD:", payload)

    user = db.query(User).filter(User.id == int(payload["sub"])).first()

    print("USER:", user)

    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user


def role_required(roles: list):
    def role_checker(current_user: User = Depends(get_current_user)):
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Access denied",
            )
        return current_user

    return role_checker
