from sqlalchemy import Column, Integer, String
from database import Base

class Users(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255),nullable=False)
    email = Column(String(255), unique=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    role=Column(String(250), nullable=False, default="Candidate") 