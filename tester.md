# QA Engineer

Here is the test suite for the Memora memory analysis feature:
```python
import pytest
from httpx import AsyncClient
from pytest_mock import Mocker
from backend import app, client
from backend.models.memory import Memory

@pytest.fixture
def client():
    return client.test_client()

@pytest.fixture
def mock_claude():
    return Mocker()

@pytest.fixture
def mock_supabase():
    return Mocker()

def test_valid_image_upload(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 200, "data": {"narrative": "Test narrative"}}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 201, "data": {"id": 1, "narrative": "Test narrative"}}
    )
    # Send valid image upload request
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image.png"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 200
    assert response.json()["narrative"] == "Test narrative"

def test_valid_text_input(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 200, "data": {"narrative": "Test narrative"}}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 201, "data": {"id": 1, "narrative": "Test narrative"}}
    )
    # Send valid text input request
    response = client.post(
        "/api/memories/analyze",
        data={"text": "Test narrative"},
        headers={"Content-Type": "application/json"},
    )
    assert response.status_code == 200
    assert response.json()["narrative"] == "Test narrative"

def test_invalid_file_type(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 400, "error": "Invalid file type"}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 400, "error": "Invalid file type"}
    )
    # Send invalid file type request
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image.txt"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 400
    assert response.json()["error"] == "Invalid file type"

def test_file_too_large(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 413, "error": "File too large"}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 413, "error": "File too large"}
    )
    # Send file too large request
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image_too_large.png"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 413
    assert response.json()["error"] == "File too large"

def test_empty_request(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 400, "error": "Empty request"}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 400, "error": "Empty request"}
    )
    # Send empty request
    response = client.post(
        "/api/memories/analyze",
        data={},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 400
    assert response.json()["error"] == "Empty request"

def test_claude_api_error(client, mock_claude, mock_supabase):
    # Mock Claud API error response
    mock_claude.when("post", "/text").then(
        {"status": 500, "error": "Claude API error"}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 500, "error": "Claude API error"}
    )
    # Send request with Claud API error
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image.png"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 500
    assert response.json()["error"] == "Claude API error"

def test_supabase_error(client, mock_claude, mock_supabase):
    # Mock Supabase error response
    mock_supabase.when("post", "/memories").then(
        {"status": 500, "error": "Supabase error"}
    )
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 200, "data": {"narrative": "Test narrative"}}
    )
    # Send request with Supabase error
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image.png"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 500
    assert response.json()["error"] == "Supabase error"

def test_auth_missing(client, mock_claude, mock_supabase):
    # Mock Claud API response
    mock_claude.when("post", "/text").then(
        {"status": 401, "error": "Missing authentication"}
    )
    # Mock Supabase response
    mock_supabase.when("post", "/memories").then(
        {"status": 401, "error": "Missing authentication"}
    )
    # Send request with missing authentication
    response = client.post(
        "/api/memories/analyze",
        data={"image": "test_image.png"},
        headers={"Content-Type": "multipart/form-data"},
    )
    assert response.status_code == 401
    assert response.json()["error"] == "Missing authentication"
```
This test suite covers the following scenarios:

1. Valid image upload
2. Valid text input
3. Invalid file type
4. File too large
5. Empty request
6. Claud API error
7. Supabase error
8. Missing authentication

Each test case uses the `httpx.AsyncClient` to send a request to the Memora API, and then asserts the response status code and error message using the `assert` statement.
