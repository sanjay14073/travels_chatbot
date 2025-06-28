from google import genai
from constants import API_KEY, MODEL_NAME

class LLMConfig:
    def __init__(self):
        self.model_name = MODEL_NAME
        self.api_key = API_KEY

    def get_client(self):
        client= genai.Client(api_key=self.api_key)
        return client