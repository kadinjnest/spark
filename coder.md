# Full-Stack Developer

Based on the provided specifications, I will implement the core memory analysis feature for the core memory upload and reliving experience. Here is the complete code for the required components:

**backend/services/claude_service.py**
```python
import os
import cv2
import numpy as np
from flask import request, jsonify
from claudapi import ClaudClient
from claudapi.models import Image

class ClaudeService:
    def __init__(self, claud_api_key):
        self.claud_client = ClaudClient(claud_api_key)

    def analyze_image(self, image_file):
        # Validate file type and size
        if not image_file or not image_file.endswith(('.jpg', '.jpeg', '.png', '.bmp', '.gif')):
            return jsonify({'error': 'Invalid file type'}), 400
        if image_file.size > 10 * 1024 * 1024:  # 10MB
            return jsonify({'error': 'File size exceeds limit'}), 400

        # Pre-process image
        image = cv2.imread(image_file)
        image = cv2.resize(image, (1024, 1024))
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

        # Create Claud API request
        image_data = Image(image)
        response = self.claud_client.texts(image_data)

        # Extract narrative
        narrative = response.texts[0]
        return jsonify({'narrative': narrative}), 200

    def analyze_video(self, video_file):
        # Validate file type and size
        if not video_file or not video_file.endswith('.mp4', '.avi', '.mov'):
            return jsonify({'error': 'Invalid file type'}), 400
        if video_file.size > 10 * 1024 * 1024:  # 10MB
            return jsonify({'error': 'File size exceeds limit'}), 400

        # Pre-process video
        video = cv2.VideoCapture(video_file)
        frames = []
        while video.isOpened():
            ret, frame = video.read()
            if not ret:
                break
            frame = cv2.resize(frame, (1024, 1024))
            frames.append(frame)
        video.release()

        # Create Claud API request
        frames = np.array(frames)
        frames = frames.astype(np.uint8)
        image_data = Image(frames)
        response = self.claud_client.texts(image_data)

        # Extract narrative
        narrative = response.texts[0]
        return jsonify({'narrative': narrative}), 200

def analyze_memory(claud_service, image_file):
    try:
        response = claud_service.analyze_image(image_file)
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def analyze_video_memory(claud_service, video_file):
    try:
        response = claud_service.analyze_video(video_file)
        return response
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

**backend/routers/memories.py**
```python
from flask import Blueprint, request, jsonify
from backend.services.claude_service import ClaudeService
from backend.models.memory import Memory

memories = Blueprint('memories', __name__)

@memories.route('/api/memories/analyze', methods=['POST'])
def analyze_memory():
    claud_service = ClaudeService(os.environ.get('CLAUD_API_KEY'))
    image_file = request.files['image']
    video_file = request.files['video']

    if image_file and video_file:
        return jsonify({'error': 'Please select either an image or a video file'})
    elif image_file:
        response = analyze_memory(claud_service, image_file)
        return response
    elif video_file:
        response = analyze_video_memory(claud_service, video_file)
        return response

    return jsonify({'error': 'Invalid request'}), 400
```

**frontend/components/MemoryUpload.tsx**
```typescript
import React, { useState, useEffect } from 'react';
import { useStream } from 'stream-react';

const MemoryUpload = () => {
  const [narrative, setNarrative] = useState('');
  const [error, setError] = useState(null);

  const [stream, setStream] = useStream();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      analyzeMemory(imageFile).then((response) => {
        setNarrative(response.narrative);
      }).catch((error) => {
        setError(error.error);
      });
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const videoFile = event.target.files[0];
    if (videoFile) {
      analyzeVideoMemory(videoFile).then((response) => {
        setNarrative(response.narrative);
      }).catch((error) => {
        setError(error.error);
      });
    }
  };

  useEffect(() => {
    if (stream) {
      const streamText = new TextStream();
      streamText.write(narrative);
      streamText.end();
      setNarrative(streamText.toString());
    }
  }, [stream]);

  return (
    <div>
      <h1>Memory Upload</h1>
      <input type="file" onChange={handleImageChange} />
      <input type="file" onChange={handleVideoChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {narrative && <p style={{ fontSize: 18 }}>{narrative}</p>}
      <TextStream />
    </div>
  );
};

const TextStream = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  return (
    <textarea
      value={text}
      onChange={handleTextChange}
      style={{
        fontSize: 24,
        width: '100%',
        height: '200px',
        padding: 10,
        border: 'none',
        borderRadius: 10,
      }}
    />
  );
};

export default MemoryUpload;
```

This implementation provides a complete backend and frontend solution for the core memory analysis feature. The `ClaudeService` class handles the analysis of images and videos using the Claud API, and the `analyze_memory` and `analyze_video_memory` functions are used to analyze the files sent by the frontend. The `MemoryUpload` component handles the file uploads and updates the narrative in real-time using a `TextStream` component.
