import os
from supabase import create_client, Client

def get_supabase() -> Client:
    url = os.environ["SUPABASE_URL"]
    key = os.environ["SUPABASE_SERVICE_KEY"]
    return create_client(url, key)


async def save_memory(user_id: str, data: dict, media_url: str | None, media_type: str) -> str:
    """Save a memory to Supabase and return the memory ID."""
    supabase = get_supabase()
    result = supabase.table("memories").insert({
        "user_id": user_id,
        "title": data["title"],
        "narrative": data["narrative"],
        "mood": data["mood"],
        "location_guess": data.get("location_guess"),
        "people_count": data.get("people_count"),
        "era_guess": data.get("era_guess"),
        "media_url": media_url,
        "media_type": media_type,
    }).execute()

    return result.data[0]["id"]


async def get_user_memories(user_id: str) -> list:
    """Fetch all memories for a user."""
    supabase = get_supabase()
    result = supabase.table("memories").select("*").eq("user_id", user_id).order("created_at", desc=True).execute()
    return result.data
