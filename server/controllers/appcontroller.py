from fastapi import APIRouter
from chat import ChatBot
from models.querymodel import QueryModel

chatbot = ChatBot()
router = APIRouter()

@router.get("/")
def read_root():
    return {"message":"Welcome to Safewheels Chatbot API"}

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/chat")
def chat(query: QueryModel):
    response = chatbot.getResponse(query.query)
    return {"response": response}
