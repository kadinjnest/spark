# UI/UX Designer

Here are the design specs for the core screens of Memora:

**1. Upload Screen**

**Wireframe Description:**

* A clean and minimalistic design with a focus on simplicity and ease of use.
* A drag-drop zone in the center of the screen to upload photos or videos.
* A text input field above the drag-drop zone to enter a title for the memory.
* A submit button below the text input field to upload the memory.

**TailwindCSS Classes:**

```css
.upload-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.drag-drop-zone {
  width: 300px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f7f7f7;
  cursor: pointer;
}

.upload-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.upload-text-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.submit-button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #3e8e41;
}
```

**Mobile Layout:**

* The drag-drop zone will be responsive and will adapt to different screen sizes.
* The text input field and submit button will be stacked on top of the drag-drop zone on mobile devices.

**Animations:**

* On hover, the submit button will animate with a subtle transition effect.

**2. Processing Screen**

**Wireframe Description:**

* A loading screen with a progress bar and a message indicating that the AI is generating a narrative.
* The background will be a soothing color to create a sense of calmness.

**TailwindCSS Classes:**

```css
.processing-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #ccc;
  border-radius: 10px;
  animation: progress-bar 2s linear infinite;
}

.progress-bar-done {
  background-color: #4CAF50;
  animation: progress-bar-done 2s linear infinite;
}

@keyframes progress-bar {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

@keyframes progress-bar-done {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}

.message {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.message-done {
  color: #4CAF50;
}
```

**Mobile Layout:**

* The processing screen will be responsive and will adapt to different screen sizes.

**Animations:**

* The progress bar will animate with a smooth transition effect.
* The message will animate with a subtle fade-in effect.

**3. Memory View**

**Wireframe Description:**

* A screen that displays a photo or video of the memory, along with a narrative and extracted details.
* The background will be a soothing color to create a sense of calmness.
* The memory view will have a subtle shadow effect to create depth.

**TailwindCSS Classes:**

```css
.memory-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.photo-container {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.video-container {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  overflow: hidden;
}

.narrative {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.extracted-details {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.share-button {
  background-color: #4CAF50;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.share-button:hover {
  background-color: #3e8e41;
}
```

**Mobile Layout:**

* The memory view will be responsive and will adapt to different screen sizes.

**Animations:**

* The photo or video will animate with a subtle fade-in effect.
* The narrative and extracted details will animate with a subtle fade-in effect.
* The share button will animate with a subtle transition effect.

**4. Dashboard**

**Wireframe Description:**

* A screen that displays a grid or timeline of memories, with an empty state message.
* The background will be a soothing color to create a sense of calmness.
* The dashboard will have a subtle shadow effect to create depth.

**TailwindCSS Classes:**

```css
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.timeline-container {
  display: flex;
  flex-direction: column;
}

.timeline-item {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #ccc;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
}

.empty-state-message {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.empty-state-message-done {
  color: #4CAF50;
}
```

**Mobile Layout:**

* The dashboard will be responsive and will adapt to different screen sizes.

**Animations:**

* The grid or timeline of memories will animate with a subtle fade-in effect.
* The empty state message will animate with a subtle fade-in effect.
* The dashboard will animate with a subtle transition effect.
