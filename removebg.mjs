
// script.mjs file
// 3d313ca3-2784-44ea-b177-d940cf265488
import  { rembg } from '@remove-background-ai/rembg.js';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();

// API_KEY will be loaded from the .env file
// const API_KEY = process.env.API_KEY;
const API_KEY = "3d313ca3-2784-44ea-b177-d940cf265488";

// log upload and download progress
const onDownloadProgress = console.log;
const onUploadProgress = console.log;
rembg({
    apiKey: API_KEY,
    inputImagePath: './input.png',
    onDownloadProgress,
    onUploadProgress
}).then(({ outputImagePath, cleanup }) => {
    console.log('✅🎉 background removed and saved under path=', outputImagePath);
    // if called, it will cleanup (remove from disk) your removed background image
    // cleanup();
});
					
						