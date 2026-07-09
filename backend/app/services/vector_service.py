import chromadb

from app.services.embedding_service import create_embedding

# Create (or open) the local Chroma database
client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(
    name="memories"
)


def index_memory(
    memory_id: int,
    text: str,
    title: str,
    category: str,
):
    """
    Store a memory embedding in ChromaDB.
    """

    embedding = create_embedding(text)

    collection.add(
        ids=[str(memory_id)],
        embeddings=[embedding],
        documents=[text],
        metadatas=[
            {
                "title": title,
                "category": category,
            }
        ],
    )

def search_memory(query: str, n_results: int = 5):
    """
    Search memories using semantic similarity.
    """

    embedding = create_embedding(query)

    results = collection.query(
        query_embeddings=[embedding],
        n_results=n_results,
    )

    return results