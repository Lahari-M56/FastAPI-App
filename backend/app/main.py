from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine

from routers import (
    auth,
    company,
    job,
    chat,
    rag,
    s3_demo,
)

# Import models so SQLAlchemy registers them
from models import (
    users,
    company as company_model,
    job as job_model,
    resume as resume_model,
)

app = FastAPI(
    title="Career Portal API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Replace with your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    # Create database tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    # Print all registered routes
    print("\n========== REGISTERED ROUTES ==========")
    for route in app.routes:
        if hasattr(route, "methods"):
            print(f"{route.path} -> {route.methods}")
    print("=======================================\n")


# Register routers
app.include_router(auth.router)
app.include_router(company.router)
app.include_router(job.router)
app.include_router(chat.router)
app.include_router(rag.router)
app.include_router(s3_demo.router)


@app.get("/")
async def root():
    return {
        "message": "Career Portal API is running"
    }


@app.get("/about")
async def about():
    return {
        "about": "This is about page"
    }


@app.get("/contact")
async def contact():
    return {
        "contact": "This is contact page"
    }