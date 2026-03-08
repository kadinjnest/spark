from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from routers import memories, auth

load_dotenv()

app = FastAPI(title="Memora API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(memories.router, prefix="/api/memories", tags=["memories"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "Memora API"}
