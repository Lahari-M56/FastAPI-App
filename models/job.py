from sqlalchemy import Column,Integer,String,Enum,relationship
from models.company import Company
from sqlalchemy.orm import declarative_Base
from database import engine,Base,SessionLocal


class Job(Base):
    __tablename__="jobs"
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,index=True,nullable=False)
    description=Column(String,unique=True)
    salary=Column(Integer)
    company_id=Column(Integer,Foreignkey("companies.id"))
    company=relationship("company",
    back_populates="jobs")
