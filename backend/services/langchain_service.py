from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables.history import RunnableWithMessageHistory
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables import RunnableLambda

store = {}

def get_history(session_id: str):
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant."),
        ("placeholder", "{chat_history}"),
        ("human", "{user_query}"),
    ]
)

chain = prompt | RunnableLambda(lambda x: x.to_string())

chat_with_memory = RunnableWithMessageHistory(
    runnable=chain,
    get_session_history=get_history,
    input_messages_key="user_query",
    history_messages_key="chat_history",
)

def chat(session_id: str, user_query: str):
    response = chat_with_memory.invoke(
        {"user_query": user_query},
        config={"configurable": {"session_id": session_id}},
    )
    return response