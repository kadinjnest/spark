import anthropic
import base64
from typing import Optional

client = anthropic.Anthropic()

MEMORY_SYSTEM_PROMPT = """You are a warm, empathetic storyteller who helps people relive their cherished memories.
When given a photo, video description, or text memory, you:
1. Write a vivid, personal narrative (200-300 words) that brings the memory to life
2. Use sensory language — sights, sounds, smells, textures, feelings
3. Speak warmly, as if you were there with them
4. Identify the mood, any people visible, location cues, and estimated era

Always respond in JSON with these fields:
{
  "title": "Short evocative title (5-8 words)",
  "narrative": "The full warm narrative...",
  "mood": "one word: joyful|nostalgic|peaceful|bittersweet|exciting|warm|tender",
  "location_guess": "e.g. 'beach', 'family home', 'city park' or null",
  "people_count": number or null,
  "era_guess": "e.g. '1990s', 'early 2000s', 'recent' or null"
}"""


async def analyze_image(image_bytes: bytes, media_type: str = "image/jpeg") -> dict:
    """Analyze an image and generate a memory narrative."""
    image_b64 = base64.standard_b64encode(image_bytes).decode("utf-8")

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        thinking={"type": "adaptive"},
        system=MEMORY_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": media_type,
                            "data": image_b64,
                        },
                    },
                    {
                        "type": "text",
                        "text": "Please help me relive this memory. Analyze the photo and create a warm narrative.",
                    },
                ],
            }
        ],
    )

    import json
    for block in response.content:
        if block.type == "text":
            return json.loads(block.text)

    raise ValueError("No text response from Claude")


async def analyze_text(text: str) -> dict:
    """Generate a memory narrative from a text description."""
    import json

    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        thinking={"type": "adaptive"},
        system=MEMORY_SYSTEM_PROMPT,
        messages=[
            {
                "role": "user",
                "content": f"Please help me relive this memory I've described:\n\n{text}",
            }
        ],
    )

    for block in response.content:
        if block.type == "text":
            return json.loads(block.text)

    raise ValueError("No text response from Claude")
