# import os
# from dotenv import load_dotenv
# from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
# from sqlalchemy.orm import declarative_base

# load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")

# if not DATABASE_URL:
#     raise ValueError("DATABASE_URL environment variable is not set")

# if DATABASE_URL.startswith("postgres://"):
#     DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
# elif DATABASE_URL.startswith("postgresql://"):
#     DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)
# if "sslmode=" in DATABASE_URL:
#     DATABASE_URL = DATABASE_URL.split("?")[0]
#     connect_args = {"ssl": "require"}
# connect_args = {}

# engine = create_async_engine(
#     DATABASE_URL,
#     echo=False,
#     connect_args={
#             "prepared_statement_cache_size": 0,
#             "statement_cache_size": 0
#         }
# )

# SessionLocal = async_sessionmaker(
#     bind=engine,
#     class_=AsyncSession,
#     autoflush=False,
#     autocommit=False,
#     expire_on_commit=False
# )

# Base = declarative_base()

# async def get_db():
#     async with SessionLocal() as db:
#         yield db
import os
from urllib.parse import urlparse, parse_qs, urlunparse

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession,
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")

# Convert PostgreSQL URL to AsyncPG URL
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgres://",
        "postgresql+asyncpg://",
        1,
    )

elif DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace(
        "postgresql://",
        "postgresql+asyncpg://",
        1,
    )

connect_args = {
    # Required for Supabase PgBouncer
    "statement_cache_size": 0,
    "prepared_statement_cache_size": 0,
}

# Handle sslmode=require safely
parsed = urlparse(DATABASE_URL)
query = parse_qs(parsed.query)

if query.get("sslmode") == ["require"]:
    connect_args["ssl"] = "require"
    DATABASE_URL = urlunparse(parsed._replace(query=""))

print("Database URL:", DATABASE_URL)

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    poolclass=NullPool,
    pool_pre_ping=True,
    connect_args=connect_args,
)

SessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)

Base = declarative_base()


async def get_db():
    async with SessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()