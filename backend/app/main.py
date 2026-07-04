from fastapi import FastAPI
from routers import company, job, auth
from routers.chat import router as chat_router

from database import Base, engine
from models import (
    job as job_model,
    company as company_model,
    users as user_model,
)

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Base.metadata.create_all(bind=engine)


from routers import company, job, auth,chat

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/about")
def read_about():
    return {"about": "This is about page"}

@app.get("/contact")
def read_contact():
    return {"contact": "This is contact page"}