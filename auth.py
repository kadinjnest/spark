from fastapi import APIRouter

router = APIRouter()

@router.get("/me")
def get_me():
    # Supabase handles auth — this is a placeholder
    return {"message": "Auth handled by Supabase on the frontend"}
