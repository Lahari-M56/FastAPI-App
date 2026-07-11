from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from pydantic import BaseModel

from database import get_db
from models.users import User
from schemas.users import UserCreate, UserResponse
from schemas.token import Token
from utils.security import hash_password, verify_password
from utils.token import create_access_token

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/register", response_model=UserResponse)
async def register(
    user: UserCreate,
    db: AsyncSession = Depends(get_db)
):
    try:
        result = await db.execute(
            select(User).filter(User.email == user.email)
        )
        existing_user = result.scalars().first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already exists"
            )

        hashed_password = hash_password(user.password)

        db_user = User(
            name=user.name,
            email=user.email,
            hashed_password=hashed_password,
            role=user.role
        )

        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)

        return db_user

    except HTTPException:
        raise

    except Exception as e:
        await db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )


@router.post("/login", response_model=Token)
async def login(
    login_data: LoginRequest,
    db: AsyncSession = Depends(get_db)
):
    try:
        result = await db.execute(
            select(User).filter(User.email == login_data.email)
        )

        user = result.scalars().first()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        if not verify_password(
            login_data.password,
            user.hashed_password
        ):
            raise HTTPException(
                status_code=401,
                detail="Incorrect password"
            )

        access_token = create_access_token(
            data={
                "sub": str(user.id),
                "role": user.role
            }
        )

        return {
            "access_token": access_token,
            "token_type": "Bearer"
        }

    except HTTPException:
        raise

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Login failed: {str(e)}"
        )