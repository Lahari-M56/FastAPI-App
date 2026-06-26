from fastapi import APIRouter
from schemas.job import JobCreate,JobUpdate


router=APIRouter(prefix="/job",tags=["job"])
jobs=[]

@router.post("/")
def create_jobs(job:JobCreate):
    jobs.append(job)
    return jobs

@router.get("/")
def get_all_job():
    return jobs

@router.get("/{job_id}")
def get_job(job_id:int):
    return jobs[job_id]

#@router.get("/")
#def read_job():
#    return{"job":"job root"}

#@router.get("/{job_id}")
#def read_job(job_id:int):
#    return{"job_id":job_id}

@router.put("/{job_id}")
def update_company(job_id:int,jobs:JobUpdate):
    jobs[job_id]=jobs
    return jobs[job_id]

@router.delete("/{job_id}")
def delete_company(job_id:int):
    jobs.pop(job_id)
    return jobs[job_id]