from fastapi import APIRouter

from app.services.database_service import get_memory_by_id
from app.services.vector_service import search_memory

router = APIRouter(
    prefix="/api",
    tags=["Search"],
)


@router.get("/search")
def semantic_search(q: str):
    """
    Search memories using semantic similarity.
    """

    chroma_results = search_memory(q)

    ids = chroma_results.get("ids", [[]])[0]
    distances = chroma_results.get("distances", [[]])[0]

    results = []

    for memory_id, distance in zip(ids, distances):
        memory = get_memory_by_id(int(memory_id))

        if memory:
            results.append(
                {
                    "memory_id": memory.id,
                    "title": memory.title,
                    "category": memory.category,
                    "summary": memory.summary,
                    "score": round(1 / (1 + distance), 3),
                }
            )

    return {
        "query": q,
        "results": results,
    }