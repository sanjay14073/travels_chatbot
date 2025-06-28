import json

with open("config/dev.json") as config_file:
    config = json.load(config_file)
    API_KEY = config["API_KEY"]
    MODEL_NAME = config["MODEL_NAME"]