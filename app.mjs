import { rembg } from "@remove-background-ai/rembg.js";
import dotenv from "dotenv";
import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const port = 3000;

// Load environment variables from .env file
dotenv.config();

// Set up multer for handling multipart/form-data
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

// API_KEY will be loaded from the .env file
// const API_KEY = process.env.API_KEY;
const API_KEY = "3d313ca3-2784-44ea-b177-d940cf265488";

// log upload and download progress
const onDownloadProgress = console.log;
const onUploadProgress = console.log;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Set up a route for handling POST requests to upload an image and remove background
app.post("/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }

  try {
    const { outputImagePath } = await rembg({
      apiKey: API_KEY,
      inputImagePath: req.file.path,
      onDownloadProgress,
      onUploadProgress,
    });

    console.log(
      "✅🎉 background removed and saved under path=",
      outputImagePath
    );

    // Send the processed image back to the client
    res.sendFile(outputImagePath);
  } catch (error) {
    console.error("Error removing background:", error);
    res.status(500).send("Error removing background.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
