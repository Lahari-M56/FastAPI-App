from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import company, job, auth,rag
from routers.chat import router as chat_router

from database import Base, engine

from models import (
    company as company_model,
    job as job_model,
    users as user_model,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentSpark API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # Change this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(company.router)
app.include_router(job.router)
app.include_router(auth.router)
app.include_router(chat_router)
app.include_router(rag.router)


@app.get("/")
def read_root():
    return {"message": "TalentSpark Backend is Running"}

@app.get("/about")
def read_about():
    return {"about": "This is the TalentSpark API backend"}

@app.get("/contact")
def read_contact():
    return {"contact": "TalentSpark Contact API"}