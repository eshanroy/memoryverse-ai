from typing import List

from pydantic import BaseModel, Field


class MemoryAnalysis(BaseModel):
    title: str = ""
    category: str = ""
    issuer: str = ""
    date: str = ""
    summary: str = ""

    skills: List[str] = Field(default_factory=list)
    technologies: List[str] = Field(default_factory=list)
    organizations: List[str] = Field(default_factory=list)

    confidence: float = 0.0