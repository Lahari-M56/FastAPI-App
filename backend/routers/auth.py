# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from database import get_db
# from models.users import Users
# from schemas.users import UserCreate, UserResponse, Login_User
# from schemas.token import Token
# from utils.security import hash_password, verify_password
# from utils.token import create_access_token

# router = APIRouter(
#     prefix="/auth",
#     tags=["Auth"]
# )


# @router.post("/register", response_model=UserResponse)
# def register(user: UserCreate, db: Session = Depends(get_db)):
#     existing_user = db.query(Users).filter(Users.email == user.email).first()

#     if existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_400_BAD_REQUEST,
#             detail="Email already exists"
#         )

#     db_user = Users(
#         name=user.name,
#         email=user.email,
#         hashed_password=hash_password(user.password),
#         role=user.role
#     )

#     db.add(db_user)
#     db.commit()
#     db.refresh(db_user)

#     return db_user


# @router.post("/login", response_model=Token)
# def login(user: Login_User, db: Session = Depends(get_db)):
#     existing_user = db.query(Users).filter(
#         Users.email == user.email
#     ).first()

#     if not existing_user:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail="User not found"
#         )

#     if not verify_password(user.password, existing_user.hashed_password):
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect password"
#         )

#     access_token = create_access_token(
#         data={
#             "sub": str(existing_user.id),
#             "role": existing_user.role
#         }
#     )

#     return {
#         "access_token": access_token,
#         "token_type": "bearer"
#     }
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from database import get_db
from models.users import Users

from schemas.users import UserCreate, UserResponse, Login_User
from schemas.token import Token

from utils.security import hash_password, verify_password
from utils.token import create_access_token


router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# ---------------- REGISTER ----------------
@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(Users).filter(Users.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    new_user = Users(
        name=user.name,
        email=user.email,
        hashed_password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ---------------- LOGIN ----------------
@router.post("/login", response_model=Token)
def login(user: Login_User, db: Session = Depends(get_db)):

    db_user = db.query(Users).filter(Users.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password"
        )

    access_token = create_access_token(
        data={
            "sub": str(db_user.id),
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }