from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional

from models.schemas import MemoryAnalysisResponse
from services import claude_service, supabase_service

router = APIRouter()

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/heic", "image/webp"}
ALLOWED_VIDEO_TYPES = {"video/mp4", "video/quicktime"}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100MB


@router.post("/analyze", response_model=MemoryAnalysisResponse)
async def analyze_memory(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None),
):
    if not file and not text:
        raise HTTPException(status_code=400, detail="Provide an image, video, or text description.")

    # Placeholder user_id — replace with real auth
    user_id = "placeholder-user-id"
    media_url = None
    media_type = "text"

    if file:
        if file.content_type not in ALLOWED_IMAGE_TYPES | ALLOWED_VIDEO_TYPES:
            raise HTTPException(status_code=400, detail=f"Unsupported file type: {file.content_type}")

        contents = await file.read()
        if len(contents) > MAX_FILE_SIZE:
            raise HTTPException(status_code=413, detail="File too large. Maximum size is 100MB.")

        if file.content_type in ALLOWED_IMAGE_TYPES:
            media_type = "image"
            analysis = await claude_service.analyze_image(contents, file.content_type)
        else:
            raise HTTPException(status_code=422, detail="Video analysis coming soon. Please upload an image or describe the memory.")
    else:
        analysis = await claude_service.analyze_text(text)

    memory_id = await supabase_service.save_memory(user_id, analysis, media_url, media_type)

    return MemoryAnalysisResponse(memory_id=memory_id, **analysis)


@router.get("/")
async def list_memories():
    # Placeholder — replace with real auth user_id
    user_id = "placeholder-user-id"
    memories = await supabase_service.get_user_memories(user_id)
    return memories
