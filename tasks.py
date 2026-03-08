"""
Pre-defined task runners for each agent role.
Run these to have individual agents complete specific work.
"""

import anyio
from team import run_agent_task


# ─── Coder Tasks ───────────────────────────────────────────────────────────────

async def build_memory_api():
    await run_agent_task(
        task="""Build the core FastAPI memory endpoint.

Requirements:
- POST /api/memories/analyze - accepts image (base64 or URL), video URL, or text
- Uses Claude claude-opus-4-6 with vision to analyze the media
- Returns: detected scene, people count, estimated date/era, mood, narrative (200-300 words)
- Stores result in Supabase (memories table)
- Auth: Supabase JWT verification
- Include proper error handling and input validation

Use streaming for the narrative generation (it can be long).
Never hardcode API keys - use environment variables.""",
        primary_agent="coder",
    )


async def build_upload_ui():
    await run_agent_task(
        task="""Build the memory upload UI component for Next.js 14.

Requirements:
- Drag-and-drop upload zone (images: JPG/PNG/HEIC, videos: MP4/MOV, max 100MB)
- Show upload progress
- Preview of uploaded file
- Text input alternative ("Describe a memory...")
- Submit button that calls /api/memories/analyze
- Loading state while AI processes (show animated message like "Reliving your memory...")
- Display the returned narrative beautifully (typewriter effect)

Use TailwindCSS + shadcn/ui. Make it warm and inviting per Creative Director vision.
File: app/components/MemoryUpload.tsx""",
        primary_agent="coder",
    )


# ─── Designer Tasks ─────────────────────────────────────────────────────────────

async def design_memory_view():
    await run_agent_task(
        task="""Design the Memory View screen - the core experience of reliving a memory.

This screen shows:
- The uploaded photo/video
- The AI-generated narrative
- Extracted details (date, location guess, mood, people)
- Share button
- 'Relive Again' (re-generate with different focus)

Deliver:
1. Complete wireframe description
2. TailwindCSS class suggestions for key elements
3. Animation/transition recommendations
4. Mobile layout (how does it adapt to phone screen?)
5. Micro-interaction details (how does the narrative appear? fade? typewriter?)""",
        primary_agent="designer",
    )


# ─── Tester Tasks ──────────────────────────────────────────────────────────────

async def write_api_tests():
    await run_agent_task(
        task="""Write comprehensive pytest tests for the memory analysis API.

Test cases needed:
1. Valid image upload → returns narrative
2. Valid text input → returns narrative
3. Invalid file type → 400 error with friendly message
4. File too large → 413 error
5. Unauthenticated request → 401
6. Claude API failure → graceful fallback
7. Supabase write failure → appropriate error

Use pytest-asyncio, httpx for async HTTP testing.
Mock Claude API and Supabase calls.
File: tests/test_memory_api.py""",
        primary_agent="tester",
    )


# ─── Reviewer Tasks ─────────────────────────────────────────────────────────────

async def review_security():
    await run_agent_task(
        task="""Perform a security review of the Memora app codebase.

Focus areas:
1. File upload security (file type validation, size limits, malicious file detection)
2. Authentication (Supabase JWT handling, RLS policies)
3. API key exposure (check for hardcoded secrets anywhere)
4. User data privacy (memories are deeply personal - how is data protected?)
5. Input sanitization (XSS, injection prevention)
6. Rate limiting (prevent API abuse)

Provide:
- List of vulnerabilities found (Critical/High/Medium/Low)
- Specific fix for each vulnerability
- Security checklist for future PRs""",
        primary_agent="reviewer",
    )


# ─── CHO Tasks ──────────────────────────────────────────────────────────────────

async def design_delight_moments():
    await run_agent_task(
        task="""As Chief Happiness Officer, design the 5 most important delight moments in Memora.

For each moment, specify:
1. What triggers it
2. What the user sees/hears/feels
3. The copy that appears
4. The animation/interaction
5. Why this moment matters emotionally

Key moments to consider:
- First memory upload ever
- Receiving a narrative that mentions something surprising
- 'On this day' notification
- Sharing a memory with someone
- Reaching 100 memories milestone

Make these moments feel magical, personal, and earned.""",
        primary_agent="chief_happiness_officer",
    )


# ─── Researcher Tasks ────────────────────────────────────────────────────────────

async def research_claude_vision():
    await run_agent_task(
        task="""Research the best approach for using Claude's vision capabilities to analyze memory photos.

Investigate:
1. What details can Claude extract from personal photos? (people, location cues, era, emotions)
2. Best prompt engineering for generating warm, personal memory narratives (not clinical descriptions)
3. How to handle sensitive content in personal photos gracefully
4. Prompt caching opportunities (system prompt is large - can we cache it?)
5. Handling different photo quality levels (old scanned photos vs modern smartphone)

Deliver:
- Optimal system prompt for memory analysis
- Example user prompts for different media types
- Cost estimation for 1000 memory analyses/day
- Recommended Claude API parameters (max_tokens, thinking, streaming)""",
        primary_agent="researcher",
    )


if __name__ == "__main__":
    import sys

    tasks = {
        "memory-api": build_memory_api,
        "upload-ui": build_upload_ui,
        "memory-view": design_memory_view,
        "api-tests": write_api_tests,
        "security": review_security,
        "delight": design_delight_moments,
        "claude-vision": research_claude_vision,
    }

    if len(sys.argv) > 1 and sys.argv[1] in tasks:
        anyio.run(tasks[sys.argv[1]])
    else:
        print("Available tasks:")
        for name in tasks:
            print(f"  python tasks.py {name}")
