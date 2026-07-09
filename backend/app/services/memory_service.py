from app.services.database_service import save_memory
from app.services.document_service import extract_document_text
from app.services.groq_service import analyze_memory
from app.services.vector_service import index_memory


def preserve_memory(file_path: str):
    """
    Complete MemoryVerse pipeline.

    1. Extract text
    2. Analyze with AI
    3. Save to database
    4. Create semantic embedding
    5. Return analysis
    """

    text = extract_document_text(file_path)

    if not text.strip():
        raise ValueError("No readable text found in the document.")

    analysis = analyze_memory(text)

    db_memory = save_memory(
        analysis=analysis,
        source_file=file_path,
    )

    search_text = f"""
Title: {analysis.title}

Category: {analysis.category}

Issuer: {analysis.issuer}

Summary: {analysis.summary}

Skills: {", ".join(analysis.skills)}

Technologies: {", ".join(analysis.technologies)}

Organizations: {", ".join(analysis.organizations)}
"""

    index_memory(
    memory_id=db_memory.id,
    text=search_text,
    title=analysis.title,
    category=analysis.category,
)

    return {
        "analysis": analysis,
        "database_id": db_memory.id,
    }