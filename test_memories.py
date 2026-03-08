import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

import sys
import os
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_analyze_no_input():
    response = client.post("/api/memories/analyze")
    assert response.status_code == 400


def test_analyze_text():
    mock_analysis = {
        "title": "Summer Afternoon",
        "narrative": "The warmth of that summer day...",
        "mood": "joyful",
        "location_guess": "backyard",
        "people_count": 3,
        "era_guess": "recent",
    }

    with patch("routers.memories.claude_service.analyze_text", new_callable=AsyncMock) as mock_claude, \
         patch("routers.memories.supabase_service.save_memory", new_callable=AsyncMock) as mock_save:
        mock_claude.return_value = mock_analysis
        mock_save.return_value = "test-memory-id"

        response = client.post(
            "/api/memories/analyze",
            data={"text": "We were all sitting in the backyard on a warm summer day."},
        )

    assert response.status_code == 200
    data = response.json()
    assert data["narrative"] == "The warmth of that summer day..."
    assert data["mood"] == "joyful"
