import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';

const app = express();

const engineId = 'stable-diffusion-v1-6';
const apiHost = process.env.API_HOST ?? 'https://api.stability.ai';
const apiKey = process.env.STABILITY_API_KEY ?? "sk-X8qgyihZthnoajtfKTIukIJOHruoPa9RSadibTlIfhHfltk4";

if (!apiKey) throw new Error('Missing Stability API key.');

app.get('/generate-image', async (req, res) => {
    const prompt = req.query.prompt || "a lady walking on beach, close up";
    // if (!prompt) {
    //     return res.status(400).json({ error: 'Prompt is required.' });
    // }
    
    try {
        const response = await fetch(
            `${apiHost}/v1/generation/${engineId}/text-to-image`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    text_prompts: [{ text: prompt }],
                    cfg_scale: 7,
                    height: 1024,
                    width: 1024,
                    steps: 30,
                    samples: 2,
                }),
            }
        );

        if (!response.ok) {
            throw new Error(`Non-200 response: ${await response.text()}`);
        }

        const responseJSON = await response.json();

        const imageUrls = responseJSON.artifacts.map((image, index) => {
            const filename = `v1_txt2img_${index}.png`;
            fs.writeFileSync(filename, Buffer.from(image.base64, 'base64'));
            return `${req.protocol}://${req.get('host')}/${filename}`; // Generating URLs
        });

        res.json({ imageUrls }); // Sending the array of image URLs
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req,res) => {
    try{
        console.log("welcome to development server");
        res.send("welcome to development server");
    }
    catch(error){
        console.error('Error connecting to server', error);
        res.status(500).json({ error: 'Error connecting to server' });
    }
})

// Serve static files from the current directory
app.use(express.static('.'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
