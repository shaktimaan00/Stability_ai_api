# Image Generation API

This repository contains an Express.js server that provides an API for generating images from text prompts using the Stability AI platform. Below, we'll explain the process, technologies used, and the available endpoints along with instructions on how to use them.

## Technologies Used

- **Express.js**: A web application framework for Node.js used to build the API endpoints.
- **node-fetch**: A library used to make HTTP requests from the Node.js environment.
- **fs**: A built-in Node.js module used to interact with the file system.

## Endpoints

### 1. Generate Image

#### Endpoint: `GET /generate-image`

This endpoint generates an image based on the provided text prompt.

#### Parameters
- **prompt**: (Optional) The text prompt used to generate the image. If not provided, a default prompt will be used.

#### How to Use
- Make a GET request to `/generate-image` with the `prompt` query parameter to generate an image. For example:
https://stability-ai-api.onrender.com/generate-image?prompt={optional}

- The generated image will be returned as a response in JSON format with an array of image URLs.

### 2. Default Route

#### Endpoint: `GET /`

This endpoint provides a welcome message indicating the server is running.

#### How to Use
- Make a GET request to `/` to receive the welcome message.

### Static File Serving

Static files (images) are served from the current directory.

## How to Run on Local Machine

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set your Stability API key and host in the environment variables (`STABILITY_API_KEY` and `API_HOST` respectively).
4. Start the server using `npm start`.

## Example

Let's say you want to generate an image of "a lady walking on beach, close up":
1. Make a GET request to `https://stability-ai-api.onrender.com/generate-image?prompt=a%20lady%20walking%20on%20beach,%20close%20up`.
2. The server will generate the image and return an array of URLs where the images are stored.
3. You can access the generated image by visiting the provided URL in your browser.

That's it! You've successfully used the Image Generation API provided by this repository.🎉🎉
