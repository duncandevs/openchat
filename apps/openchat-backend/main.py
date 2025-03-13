import os
import json
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List
from langchain_together import ChatTogether

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

together_api_key = os.getenv("TOGETHER_API_KEY")
if not together_api_key:
    raise ValueError("TOGETHER_API_KEY environment variable is not set.")


class ChatOptions(BaseModel):
    prompt: str = None
    model: str = None


class ChatMessage(BaseModel):
    role: str  # "user" or "ai"
    content: str


class ChatRequest(BaseModel):
    id: str = None
    messages: List[ChatMessage] = []
    data: ChatOptions = None


# Stream responses
async def chat_stream(prompt: str, model: str = None):
    chat_model = ChatTogether(
        model=model,
        together_api_key=together_api_key,
    )
    async for message in chat_model.astream(prompt):
        yield message.content


@app.post("/api/v1/chat", status_code=200)
async def chat_endpoint(chat_request: ChatRequest):
    if not chat_request.messages:
        raise HTTPException(
            status_code=400, detail="Missing required fields 'messages'"
        )

    conversation = ""
    model = chat_request.data.model or "meta-llama/Llama-3-70b-chat-hf"

    try:
        for msg in chat_request.messages:
            if msg.role.lower() == "user":
                conversation += f"User: {msg.content}\n"
            elif msg.role.lower() == "ai":
                conversation += f"AI: {msg.content}\n"
            else:
                conversation += f"{msg.role.capitalize()}: {msg.content}\n"
        return StreamingResponse(
            chat_stream(conversation, model), media_type="application/x-ndjson"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
