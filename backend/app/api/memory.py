from fastapi import APIRouter
from sqlmodel import Session, select

from app.database import engine
from app.models.memory import Memory

router = APIRouter(
    prefix="/api",
    tags=["Memory"],
)


@router.get("/memories")
def get_memories():
    """
    Return every stored memory.
    """

    with Session(engine) as session:
        memories = session.exec(select(Memory)).all()

    return memories