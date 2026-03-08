# Project Planner

**System Architecture Overview**

Our system architecture consists of the following components:

* **Frontend**: Built using Next.js 14 with App Router, TypeScript, and TailwindCSS. The frontend will handle user interactions, rendering the UI, and making requests to the backend API.
* **Backend**: Built using FastAPI (Python) with Supabase as the database and storage provider. The backend will handle API requests, process data, and interact with the Supabase database.
* **Database**: Supabase PostgreSQL database for storing user data, memories, media files, and narratives.
* **AI Layer**: Claude API (Anthropic) for AI-generated narratives and sentiment analysis.

**Core Data Models**

We define the following core data models:

1. **User**
	* `id` (unique identifier)
	* `username` (string)
	* `email` (string)
	* `password` (hashed string)
	* `name` (string)
	* `bio` (string)
2. **Memory**
	* `id` (unique identifier)
	* `user_id` (foreign key referencing the User model)
	* `title` (string)
	* `description` (string)
	* `media_file_id` (foreign key referencing the MediaFile model)
	* `narrative_id` (foreign key referencing the Narrative model)
	* `date_uploaded` (timestamp)
3. **MediaFile**
	* `id` (unique identifier)
	* `user_id` (foreign key referencing the User model)
	* `filename` (string)
	* `file_type` (string)
	* `file_content` (binary data)
4. **Narrative**
	* `id` (unique identifier)
	* `memory_id` (foreign key referencing the Memory model)
	* `story_text` (string)
	* `sentiment_analysis` (sentiment analysis result from Claude API)

**REST API Endpoint Design**

We design the following REST API endpoints:

1. **POST /api/v1/users**: Create a new user account
	* Request body: `username`, `email`, `password`
	* Response shape: `{ id, username, email }`
2. **POST /api/v1/memories**: Upload a new memory
	* Request body: `title`, `description`, `media_file_id`
	* Response shape: `{ id, user_id, title, description, media_file_id }`
3. **GET /api/v1/memories/{memory_id}**: Retrieve a memory by ID
	* Response shape: `{ id, user_id, title, description, media_file_id, narrative_id }`
4. **POST /api/v1/narratives**: Create a new narrative
	* Request body: `story_text`
	* Response shape: `{ id, memory_id, story_text, sentiment_analysis }`

**Sprint 1 Task List**

1. **Task 1.1**: Implement user authentication using Supabase Auth
	* Acceptance criteria: Users can log in and log out successfully
2. **Task 1.2**: Design and implement the memory upload form
	* Acceptance criteria: Users can upload a new memory with a title, description, and media file
3. **Task 1.3**: Create the Supabase database schema for Memories and MediaFiles
	* Acceptance criteria: Database schema is correctly implemented
4. **Task 1.4**: Implement the media file upload and storage
	* Acceptance criteria: Media files are uploaded and stored correctly
5. **Task 1.5**: Design and implement the narrative generation endpoint
	* Acceptance criteria: Narrative is generated correctly for a given memory
6. **Task 1.6**: Implement the sentiment analysis feature using Claude API
	* Acceptance criteria: Sentiment analysis is performed correctly on the narrative
7. **Task 1.7**: Design and implement the memory reliving experience
	* Acceptance criteria: Users can relive a memory with a narrative and sentiment analysis
8. **Task 1.8**: Implement the UI for the memory reliving experience
	* Acceptance criteria: UI is responsive and user-friendly
9. **Task 1.9**: Test and iterate on the memory upload and reliving experience
	* Acceptance criteria: Experience is stable and functional

**Key Decisions for React Native Mobile**

To enable React Native mobile, we make the following key decisions:

* **Use a hybrid approach**: We will use a hybrid approach, where the frontend is built using React Native and the backend API is still built using FastAPI and Supabase.
* **Implement API mocking**: We will implement API mocking to simulate the backend API calls for React Native mobile, ensuring a seamless user experience.
* **Use React Native's built-in storage**: We will use React Native's built-in storage mechanisms to store media files and user data, eliminating the need for a separate storage solution.
* **Optimize for performance**: We will optimize the React Native app for performance, ensuring fast rendering and responsive UI.
