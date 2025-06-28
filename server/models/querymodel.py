from pydantic import BaseModel, Field

class QueryModel(BaseModel):
    query:str= Field(..., description="The query string to be processed by the chatbot")