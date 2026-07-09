from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Memory(SQLModel, table=True):
    """
    Database model for a preserved memory.
    """

    id: Optional[int] = Field(default=None, primary_key=True)

    title: str
    category: str
    issuer: str = ""
    date: str = ""
    summary: str = ""

    skills: str = ""
    technologies: str = ""
    organizations: str = ""

    source_file: str

    created_at: datetime = Field(default_factory=datetime.utcnow)