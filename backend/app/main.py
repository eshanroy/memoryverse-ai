from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router
from app.api.memory import router as memory_router
from app.api.search import router as search_router
from app.api.upload import router as upload_router
from app.database import create_db
from app.models.memory import Memory
from app.services.embedding_service import create_embedding
from app.services.groq_service import analyze_memory

app = FastAPI(
    title="MemoryVerse API",
    description="AI-Powered Digital Identity System",
    version="1.0.0",
)

# Allow React frontend to communicate with FastAPI
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "https://memoryverse-ai-eight.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(upload_router)
app.include_router(memory_router)
app.include_router(search_router)
app.include_router(chat_router)

@app.on_event("startup")
def on_startup():
    create_db()


@app.get("/")
def root():
    return {
        "message": "Welcome to MemoryVerse API 🚀"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


@app.get("/test-ai")
def test_ai():
    sample_text = """
    IBM SkillsBuild

    Python for Data Science

    Issued to: Eshan Roy

    Successfully completed the Python for Data Science course.
    """

    try:
        result = analyze_memory(sample_text)

        return {
            "success": True,
            "memory": result.model_dump()
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.get("/test-embedding")
def test_embedding():
    embedding = create_embedding(
        "Python for Data Science certification"
    )

    return {
        "dimensions": len(embedding),
        "first_10_values": embedding[:10]
    }