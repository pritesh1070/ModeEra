const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const rembg = require('rembg');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Helper function to process image with sharp
const processImage = async (inputPath, outputPath, options) => {
  let image = sharp(inputPath);
  
  if (options.brightness) {
    image = image.modulate({
      brightness: 1 + (options.brightness / 100),
    });
  }
  
  if (options.contrast) {
    image = image.modulate({
      contrast: 1 + (options.contrast / 100),
    });
  }
  
  if (options.blur) {
    image = image.blur(options.blur);
  }
  
  await image.toFile(outputPath);
};

// Routes
app.post('/api/remove-background', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `removed-${req.file.filename}`);

    // Process image with rembg
    const input = fs.readFileSync(inputPath);
    const output = await rembg.remove(input);
    fs.writeFileSync(outputPath, output);

    // Send the processed image
    res.sendFile(outputPath, { root: __dirname });

    // Clean up files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error('Error removing background:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

app.post('/api/enhance-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const inputPath = req.file.path;
    const outputPath = path.join('uploads', `enhanced-${req.file.filename}`);
    const options = req.body;

    await processImage(inputPath, outputPath, options);

    // Send the processed image
    res.sendFile(outputPath, { root: __dirname });

    // Clean up files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error('Error enhancing image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

app.post('/api/convert-format', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const inputPath = req.file.path;
    const targetFormat = req.body.format || 'png';
    const outputPath = path.join('uploads', `converted-${req.file.filename}.${targetFormat}`);

    await sharp(inputPath)
      .toFormat(targetFormat)
      .toFile(outputPath);

    // Send the processed image
    res.sendFile(outputPath, { root: __dirname });

    // Clean up files
    fs.unlinkSync(inputPath);
    fs.unlinkSync(outputPath);
  } catch (error) {
    console.error('Error converting image:', error);
    res.status(500).json({ error: 'Error processing image' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 