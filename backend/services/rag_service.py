import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate
from services.qdrant_service import search_jobs
load_dotenv()
llm = ChatGroq(
    model="llama3-70b-8192",
    temperature=0,
    groq_api_key=GROQ_API_KEY
)
rag_prompt=ChatPromptTemplate.from_messages([
        ("system", """You are a job search assistant.
         Use the following job listings retrieved from the database to answer.
         If no relevant job are found, say so clearly.

         Retrieved Jobs:

         {context}"""),
        ("human", "{question}")
])

rag_chain=rag_prompt | llm
def rag_job_search(question:str) -> str:
    results=search_jobs(question,top_k=5)
    if not results:
        return "No  job listings found in the database.Please embed jobs first using the /rag/ebed-jobs endpoint."
    context="\n".join([f"-{r['title']} :{r['description']} (Salary: {r['salary']}),Match: {r['score']})" 
    for r in results
    ])

    response=rag_chain.invoke({"context":context,"question":question})
    return response.content