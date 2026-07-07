from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

# Import models so SQLAlchemy registers them
from models.users import User
from models.company import Company
from models.job import Job

# Import routers
from routers import auth, company, job, chat, rag

app = FastAPI(
    title="AI Resume Screening API",
    version="1.0.0"
)

# Create database tables (only if you're not using Alembic migrations)
Base.metadata.create_all(bind=engine)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # React/Vite
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)
app.include_router(chat.router)
app.include_router(rag.router)


@app.get("/")
def root():
    return {
        "message": "AI Resume Screening Backend Running"
    }


@app.get("/about")
def about():
    return {
        "project": "AI Resume Screening System",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "OK"
    }