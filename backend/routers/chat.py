from fastapi import APIRouter
from schemas.chat import ChatRequest, ChatResponse
from services.langchain_service import chat
router = APIRouter(prefix="/chat", tags=["Chat"])


@router.post("/", response_model=ChatResponse)
def chat_api(request: ChatRequest):
    answer = chat(
        session_id=request.session_id,
        user_query=request.user_query,
    )

    return ChatResponse(response=answer)
