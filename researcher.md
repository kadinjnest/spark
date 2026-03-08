# Technical Researcher

**Research Findings:**

Based on the requirements, I have conducted research to provide recommendations for the core memory upload and reliving experience.

**1. Optimal Claude API Prompt for Warm, Personal Memory Narration:**

To create a warm and personal memory narration, I recommend the following prompt:

`"Describe the emotional tone of a 5-minute clip of a [family/holiday event] where [specific action or event] occurred. Focus on the sounds, sights, and feelings of the moment. Use descriptive language to bring the scene to life."`

This prompt encourages the AI to focus on the emotional tone of the memory and to use descriptive language to create a vivid narrative.

**2. Handling Old/Low-Quality Scanned Photos:**

To handle old/low-quality scanned photos gracefully, I recommend the following approach:

* **Pre-processing**: Apply a series of image enhancements to improve the quality of the scanned photos, such as:
	+ Noise reduction
	+ Contrast adjustment
	+ Color correction
	+ Sharpening
* **Object Detection**: Use computer vision techniques to detect and extract relevant objects from the image, such as:
	+ Faces
	+ Objects
	+ Landmarks
* **Scene Understanding**: Analyze the scene to determine the context and setting, such as:
	+ Indoor/outdoor
	+ Time of day
	+ Weather
	+ Location

This approach will help to improve the quality of the image and provide context for the AI to better understand the scene.

**3. Best Approach for Video: Frame Extraction vs Thumbnail Analysis:**

To determine the best approach for video analysis, I recommend the following:

* **Frame Extraction**: Extract a representative frame from the video to analyze the scene. This can be done by:
	+ Using a machine learning model to select a frame that best represents the scene
	+ Using a computer vision algorithm to extract a frame that captures the most interesting or relevant information
* **Thumbnail Analysis**: Analyze a thumbnail of the video to get a sense of the scene. This can be done by:
	+ Using a machine learning model to select a thumbnail that best represents the scene
	+ Using a computer vision algorithm to extract features from the thumbnail

Both approaches have their advantages and disadvantages. Frame extraction provides more detailed information, but can be time-consuming and computationally intensive. Thumbnail analysis provides faster results, but may not capture as much detail.

**4. Prompt Caching Strategy:**

To implement a prompt caching strategy, I recommend the following:

* **Store**: Store the most recent prompt used for each user and memory.
* **Query**: Use the stored prompt to generate a new prompt for the next memory analysis.
* **Update**: Update the stored prompt when a new prompt is generated.

This approach will help to reduce the number of prompt requests made to the Claude API, reducing costs and improving performance.

**5. Cost Estimate:**

Based on the research, I estimate the following costs:

* **Claude API**: 1,000 image analyses/day at $5/1M input tokens = $50/day
* **Pre-processing**: Estimated cost of pre-processing images = $10/day
* **Object Detection**: Estimated cost of object detection = $5/day
* **Scene Understanding**: Estimated cost of scene understanding = $5/day
* **Prompt Caching**: Estimated cost of prompt caching = $5/day

Total estimated cost per day = $75

This estimate assumes that the Claude API is the primary cost driver, followed by pre-processing, object detection, scene understanding, and prompt caching.

**Recommendations:**

Based on the research, I recommend the following system prompt and API call parameters:

* System prompt: "Describe the emotional tone of a 5-minute clip of a [family/holiday event] where [specific action or event] occurred. Focus on the sounds, sights, and feelings of the moment. Use descriptive language to bring the scene to life."
* API call parameters:
	+ Input format: Image
	+ Input size: 1024x1024
	+ Output format: Text
	+ Output size: 500 characters
	+ Prompt caching: Enable prompt caching for 30 days

This system prompt and API call parameters are designed to provide a warm and personal memory narration, while also handling old/low-quality scanned photos and videos. The prompt caching strategy will help to reduce the number of prompt requests made to the Claude API, reducing costs and improving performance.
