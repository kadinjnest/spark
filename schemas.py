from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MemoryAnalysisRequest(BaseModel):
    text: Optional[str] = None


class MemoryAnalysisResponse(BaseModel):
    memory_id: str
    title: str
    narrative: str
    mood: str
    location_guess: Optional[str] = None
    people_count: Optional[int] = None
    era_guess: Optional[str] = None


class Memory(BaseModel):
    id: str
    user_id: str
    title: str
    narrative: str
    mood: str
    location_guess: Optional[str] = None
    people_count: Optional[int] = None
    era_guess: Optional[str] = None
    media_url: Optional[str] = None
    media_type: str  # "image" | "video" | "text"
    created_at: datetime
