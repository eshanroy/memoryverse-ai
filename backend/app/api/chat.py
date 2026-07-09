from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import ask_aura
from app.services.vector_service import search_memory


class ChatRequest(BaseModel):
    question: str


router = APIRouter(
    prefix="/api",
    tags=["AURA"],
)


@router.post("/chat")
def chat(request: ChatRequest):
    print("STEP 1")

    results = search_memory(request.question)
    print("STEP 2")

    documents = results.get("documents", [[]])[0]
    print("STEP 3")

    context = "\n\n".join(documents)
    print("STEP 4")

    answer = ask_aura(
        request.question,
        context,
    )
    print("STEP 5")

    return {
        "answer": answer
    }