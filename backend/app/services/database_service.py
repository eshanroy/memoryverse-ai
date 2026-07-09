from sqlmodel import Session, select

from app.database import engine
from app.models.memory import Memory
from app.schemas.memory import MemoryAnalysis


def save_memory(
    analysis: MemoryAnalysis,
    source_file: str,
):
    """
    Save AI Memory into SQLite.
    """

    memory = Memory(
        title=analysis.title,
        category=analysis.category,
        issuer=analysis.issuer,
        date=analysis.date,
        summary=analysis.summary,
        skills=",".join(analysis.skills),
        technologies=",".join(analysis.technologies),
        organizations=",".join(analysis.organizations),
        source_file=source_file,
    )

    with Session(engine) as session:
        session.add(memory)
        session.commit()
        session.refresh(memory)

    return memory


def get_memory_by_id(memory_id: int):
    """
    Retrieve a memory by its database ID.
    """

    with Session(engine) as session:
        statement = select(Memory).where(Memory.id == memory_id)
        memory = session.exec(statement).first()

    return memory


def get_all_memories():
    """
    Retrieve all stored memories.
    """

    with Session(engine) as session:
        statement = select(Memory)
        memories = session.exec(statement).all()

    return memories