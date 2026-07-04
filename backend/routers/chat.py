# from fastapi import APIRouter
# from schemas.chat import ChatRequest, ChatResponse
# from services.langchain_service import chat

# router = APIRouter(prefix="/chat", tags=["Chat"])
# @router.post("/", response_model=ChatResponse)
# def chat_api(request: ChatRequest):
#     answer = chat(
#         session_id=request.session_id,
#         user_query=request.user_query,
#     )
#     return ChatResponse(response=answer)

# @router.get("/health")
# def health_check():
#     return {"status": "ok"}

from fastapi import APIRouter
from pydantic import BaseModel
from services.langchain_service import ask_ai

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

class ChatRequest(BaseModel):
    user_query: str
    session_id: str = "user1"

@router.post("/")
def chat(request: ChatRequest):
    response = ask_ai(request.user_query, request.session_id)
    return {"response": response}