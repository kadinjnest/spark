"""
Memora - AI Agent Team (Local / Ollama)
Runs entirely on your machine -- no API keys needed.

Requirements:
  1. Install Ollama: https://ollama.com/download
  2. Pull a model:  ollama pull llama3.1:8b
  3. pip install -r requirements.txt
  4. Run: python team.py
"""

import ollama
import json
from pathlib import Path

# --- Config -------------------------------------------------------------------

MODEL = "llama3.2:3b"       # Change to "llama3.1:8b" if you have 6GB+ free RAM
OUTPUT_DIR = Path("./output")
OUTPUT_DIR.mkdir(exist_ok=True)

# --- Agent Definitions --------------------------------------------------------

AGENTS = {
    "creative_director": {
        "name": "Creative Director",
        "system": """You are the Creative Director for 'Memora', a memory reliving app.
Your mission: define the brand vision, aesthetic, and emotional experience.
Memora lets users upload photos, videos, or text and receive AI-generated narratives
that transport them back to their best memories.
Think Pixar-level emotional storytelling meets minimalist design.
Be specific, inspiring, and actionable. Use clear headings and bullet points.""",
    },
    "planner": {
        "name": "Project Planner",
        "system": """You are the Project Planner for 'Memora', a memory reliving web app.
Tech stack: Next.js 14 (App Router, TypeScript, TailwindCSS), FastAPI (Python),
Supabase (PostgreSQL + Storage + Auth), Claude API (Anthropic) for AI features.
You produce structured architecture docs and sprint plans.
Use clear headings, numbered lists, and acceptance criteria for every task.""",
    },
    "brand_ambassador": {
        "name": "Brand Ambassador",
        "system": """You are the Brand Ambassador and copywriter for 'Memora'.
Brand voice: warm, personal, magical -- never clinical or corporate.
Speak like a trusted friend. Use sensory language. Make memories feel alive.
You write UI microcopy, onboarding flows, taglines, and error messages.
Every word matters. Be specific -- write actual copy, not descriptions of copy.""",
    },
    "designer": {
        "name": "UI/UX Designer",
        "system": """You are the UI/UX Designer for 'Memora', a memory reliving app.
You design warm, intuitive, emotionally resonant interfaces using TailwindCSS and shadcn/ui.
Design web-first but mobile-ready (responsive + future React Native).
Use TailwindCSS class names in your specs. Describe wireframes clearly.
Focus on warmth, nostalgia, and joy in every design decision.""",
    },
    "chief_happiness_officer": {
        "name": "Chief Happiness Officer",
        "system": """You are the Chief Happiness Officer (CHO) for 'Memora'.
You champion user delight, micro-interactions, and surprise-and-delight moments.
This app handles people's most precious memories -- every interaction must be
handled with care, respect, and joy. You think in emotional journeys, not just flows.
Be specific: describe exact animations, copy, and timing for each delight moment.""",
    },
    "researcher": {
        "name": "Technical Researcher",
        "system": """You are the Technical Researcher for 'Memora'.
You research best practices, optimal libraries, and API patterns.
For AI features, focus on prompting strategies for warm, personal memory narration
(not clinical image descriptions). Always provide concrete recommendations with reasoning.
Include cost estimates and performance considerations.""",
    },
    "coder": {
        "name": "Full-Stack Developer",
        "system": """You are the Lead Developer for 'Memora'.
Tech stack:
- Frontend: Next.js 14 (App Router), TypeScript, TailwindCSS, shadcn/ui
- Backend: FastAPI (Python 3.11+), async, Pydantic v2
- Database: Supabase (PostgreSQL + Storage + Auth)
- AI: Anthropic Claude API (vision, streaming, adaptive thinking)

Write complete, working code. Always:
- Use proper TypeScript types (no 'any')
- Handle errors with user-friendly messages
- Use environment variables for secrets (never hardcode)
- Follow Next.js 14 App Router patterns
- Write async FastAPI endpoints""",
    },
    "tester": {
        "name": "QA Engineer",
        "system": """You are the QA Engineer for 'Memora'.
You write comprehensive test suites covering happy paths, edge cases, and error scenarios.
Tools: pytest + pytest-asyncio for backend, Vitest for frontend.
Always mock external services (Claude API, Supabase) in tests.
Include a conftest.py with shared fixtures. Report bugs with severity levels.""",
    },
    "reviewer": {
        "name": "Code Reviewer",
        "system": """You are the Code Reviewer for 'Memora'.
Review code for: security (OWASP Top 10), TypeScript safety, error handling,
Supabase RLS policies, Claude API efficiency, and privacy.
This app stores people's personal memories -- privacy is critical.
Always suggest specific fixes, not just identify problems.
Categorise issues as Critical / High / Medium / Low.""",
    },
}

# --- Core Agent Runner --------------------------------------------------------

def run_agent(agent_key: str, prompt: str, context: str = "") -> str:
    """Run a single agent and return its response."""
    agent = AGENTS[agent_key]
    print(f"\n{'-'*60}")
    print(f"  {agent['name'].upper()}")
    print(f"{'-'*60}")

    messages = [{"role": "system", "content": agent["system"]}]

    if context:
        messages.append({
            "role": "user",
            "content": f"Context from previous agents:\n\n{context}\n\n---\n\nYour task:\n{prompt}"
        })
    else:
        messages.append({"role": "user", "content": prompt})

    response = ollama.chat(
        model=MODEL,
        messages=messages,
        options={"temperature": 0.7, "num_predict": 2048},
    )

    result = response["message"]["content"]
    print(result)

    # Save output to file
    output_file = OUTPUT_DIR / f"{agent_key}.md"
    output_file.write_text(f"# {agent['name']}\n\n{result}\n", encoding="utf-8")
    print(f"\n  [Saved -> output/{agent_key}.md]")

    return result


# --- Full Team Kickoff --------------------------------------------------------

def run_crew(focus: str = "the core memory upload and reliving experience"):
    """Run all 9 agents sequentially, passing context forward."""

    print(f"""
==============================================================
  MEMORA -- AI Agent Team (Local / Ollama)
  Model: {MODEL:<20} No API required
==============================================================

Focus: {focus}
Agents will run one at a time. Output saved to agents/output/
(CPU inference - this will take a few minutes per agent)
""")

    context = ""
    results = {}

    # 1. Creative Director sets the vision
    results["creative_director"] = run_agent(
        "creative_director",
        f"""Define the complete brand vision for Memora focused on: {focus}

Deliver:
1. 5 core brand personality attributes with descriptions
2. Visual language direction (colour palette, mood, aesthetic)
3. The core emotional experience we're designing for
4. 3 creative principles every team member must follow
5. How the app should feel when someone uploads their wedding photo""",
    )
    context = f"CREATIVE DIRECTION:\n{results['creative_director']}"

    # 2. Planner creates the architecture
    results["planner"] = run_agent(
        "planner",
        f"""Create the technical architecture and Sprint 1 plan for: {focus}

Deliver:
1. System architecture overview (frontend, backend, database, AI layer)
2. Core data models (User, Memory, MediaFile, Narrative) with fields
3. REST API endpoint design with request/response shapes
4. Sprint 1 task list (8-10 tasks) with acceptance criteria
5. Key decisions that enable React Native mobile later""",
        context=context,
    )
    context += f"\n\nARCHITECTURE & PLAN:\n{results['planner']}"

    # 3. Brand Ambassador crafts the voice
    results["brand_ambassador"] = run_agent(
        "brand_ambassador",
        f"""Create the complete copy guide for Memora focused on: {focus}

Deliver:
1. Brand voice guide (5 principles with on-brand vs off-brand examples)
2. Onboarding copy (welcome screen, empty state, first upload prompt)
3. Core UI microcopy (upload CTA, loading state, memory view header, error messages)
4. 3 tagline options and one-sentence value proposition
5. Push notification templates ('On this day...', first memory, milestone)""",
        context=context,
    )
    context += f"\n\nBRAND & COPY:\n{results['brand_ambassador']}"

    # 4. Designer specs the screens
    results["designer"] = run_agent(
        "designer",
        f"""Design the core screens for Memora focused on: {focus}

Design these 4 screens with full specs:
1. Upload screen -- drag-drop zone, text alternative, submit CTA
2. Processing screen -- loading state while AI generates narrative
3. Memory view -- photo/video + narrative + extracted details + share
4. Dashboard -- memory grid/timeline, empty state

For each: wireframe description, TailwindCSS classes, mobile layout, animations.""",
        context=context,
    )
    context += f"\n\nDESIGN SPECS:\n{results['designer']}"

    # 5. CHO designs the delight moments
    results["chief_happiness_officer"] = run_agent(
        "chief_happiness_officer",
        f"""Design the 5 most important delight moments for Memora focused on: {focus}

For each moment specify:
- Trigger (what causes it)
- Visual/interaction (exactly what the user sees)
- Copy (exact words shown)
- Animation details (duration, easing, what moves)
- Emotional impact (why this moment matters)

Moments: first upload, surprising narrative detail, 'On this day', sharing, 10-memory milestone.""",
        context=context,
    )
    context += f"\n\nDELIGHT MOMENTS:\n{results['chief_happiness_officer']}"

    # 6. Researcher finds the best approach
    results["researcher"] = run_agent(
        "researcher",
        f"""Research the best technical approach for: {focus}

Investigate:
1. Optimal Claude API prompt for warm, personal memory narration (write the actual prompt)
2. How to handle old/low-quality scanned photos gracefully
3. Best approach for video: frame extraction vs thumbnail analysis
4. Prompt caching strategy to reduce Claude API costs
5. Cost estimate: 1,000 image analyses/day at Claude Opus 4.6 pricing ($5/1M input tokens)

Deliver the recommended system prompt and API call parameters.""",
        context=context,
    )
    context += f"\n\nRESEARCH:\n{results['researcher']}"

    # 7. Coder implements
    results["coder"] = run_agent(
        "coder",
        f"""Implement the core memory analysis feature for: {focus}

Write complete, working code for:

1. backend/services/claude_service.py -- updated with optimal prompts from research
2. backend/routers/memories.py -- complete POST /api/memories/analyze endpoint
3. frontend/components/MemoryUpload.tsx -- wired to real backend with streaming narrative

Requirements:
- Use streaming for narrative generation (typewriter effect in UI)
- Validate file type and size before sending to Claude
- Handle errors with friendly user messages
- Include TypeScript types for all data shapes
- Never hardcode secrets""",
        context=context,
    )
    context += f"\n\nIMPLEMENTATION:\n{results['coder']}"

    # 8. Tester writes the test suite
    results["tester"] = run_agent(
        "tester",
        f"""Write the test suite for the Memora memory analysis feature.

Write:
1. backend/tests/conftest.py -- fixtures (test client, mock Claude, mock Supabase)
2. backend/tests/test_memories.py -- 8+ test cases:
   - Valid image upload → 200 + narrative
   - Valid text input → 200 + narrative
   - Invalid file type → 400
   - File too large → 413
   - Empty request → 400
   - Claude API error → 500 with friendly message
   - Supabase error → 500 with friendly message
   - Auth missing → 401

Use pytest-asyncio and httpx.AsyncClient.""",
        context=context,
    )
    context += f"\n\nTESTS:\n{results['tester']}"

    # 9. Reviewer audits everything
    results["reviewer"] = run_agent(
        "reviewer",
        """Review the full implementation produced by this agent team.

Audit for:
1. Security vulnerabilities (file upload, injection, XSS, auth bypass)
2. Privacy issues (personal memory data -- GDPR considerations)
3. TypeScript type safety
4. Missing error handling
5. Claude API cost efficiency
6. Supabase RLS policy gaps
7. Performance issues

Deliver:
- Issue list categorised as Critical / High / Medium / Low
- Specific code fix for each Critical and High issue
- PR security checklist (5-7 items) for future development""",
        context=context,
    )

    # Save full report
    full_report = "\n\n---\n\n".join(
        f"# {AGENTS[key]['name']}\n\n{content}"
        for key, content in results.items()
    )
    report_path = OUTPUT_DIR / "full_report.md"
    report_path.write_text(full_report, encoding="utf-8")

    print(f"""
{'='*60}
  CREW COMPLETE
  Individual outputs: agents/output/<agent>.md
  Full report:        agents/output/full_report.md
{'='*60}
""")
    return results


# --- Single Agent Runner ------------------------------------------------------

def run_single(agent_key: str, task: str):
    """Run one agent on a custom task."""
    if agent_key not in AGENTS:
        print(f"Unknown agent '{agent_key}'. Choose from:\n  " + "\n  ".join(AGENTS.keys()))
        return
    return run_agent(agent_key, task)


# --- Entry Point --------------------------------------------------------------

if __name__ == "__main__":
    import sys

    if len(sys.argv) == 1:
        run_crew()

    elif len(sys.argv) == 2:
        run_crew(focus=sys.argv[1])

    elif len(sys.argv) >= 3:
        agent_key = sys.argv[1]
        task = " ".join(sys.argv[2:])
        run_single(agent_key, task)

    else:
        print("Usage:")
        print("  python team.py                              # Full team kickoff")
        print("  python team.py 'focus area'                # Custom focus")
        print("  python team.py <agent_name> 'task'         # Single agent")
        print("\nAgents:", ", ".join(AGENTS.keys()))
