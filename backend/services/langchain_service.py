import os
from dotenv import load_dotenv

from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_core.chat_history import InMemoryChatMessageHistory

load_dotenv()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError(
        "GROQ_API_KEY not found. Please add it to your .env file."
    )

LLAMA_MODEL = "llama-3.3-70b-versatile"

llm = ChatGroq(
    model=LLAMA_MODEL,
    groq_api_key=GROQ_API_KEY
)

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a helpful AI assistant. Answer the user's questions clearly."
        ),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{user_query}")
    ]
)

# Create Chain
chain = prompt | llm | StrOutputParser()


store = {}

def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

chat_with_memory = RunnableWithMessageHistory(
    runnable=chain,
    get_session_history=get_history,
    input_messages_key="user_query",
    history_messages_key="chat_history"
)

def ask_ai(user_query: str, session_id: str = "user1"):
    response = chat_with_memory.invoke(
        {"user_query": user_query},
        config={
            "configurable": {
                "session_id": session_id
            }
        }
    )

    return response