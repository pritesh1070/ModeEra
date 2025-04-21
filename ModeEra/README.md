# ModeEra - Image Processing Web Application

ModeEra is a powerful web application that provides various image processing tools including background removal, image enhancement, and format conversion. The application features a modern, responsive UI with dark/light theme support and is built using React and Node.js.

## Features

- **Background Remover**: Remove backgrounds from images with a single click
- **Image Enhancer**: Enhance images with professional-grade adjustments
- **Format Converter**: Convert images between different formats (PNG, JPG, JPEG, WebP, GIF)
- **User Authentication**: Sign up and login with email or Google
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light themes
- **Real-time Preview**: Compare original and processed images with a slider
- **Secure File Handling**: Process images securely on the server

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Python (for rembg library)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/modeera.git
cd modeera
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
- Copy `.env.example` to `.env` in both root and server directories
- Update the variables with your configuration

4. Install Python dependencies for rembg:
```bash
pip install rembg
```

## Running the Application

1. Start the backend server:
```bash
cd server
npm start
```

2. Start the frontend development server:
```bash
cd ..
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
modeera/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── tools/             # Image processing tools
│   └── App.js             # Main application component
├── server/                # Backend source code
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   └── index.js           # Server entry point
├── public/                # Static files
└── package.json           # Project dependencies
```

## API Endpoints

- `POST /api/remove-background`: Remove background from an image
- `POST /api/enhance-image`: Enhance an image with various adjustments
- `POST /api/convert-format`: Convert an image to a different format

## Technologies Used

- **Frontend**:
  - React
  - Material-UI
  - React Router
  - React Dropzone
  - Axios

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - Sharp
  - Rembg
  - Multer

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@modeera.com or create an issue in the repository.

## Acknowledgments

- [Sharp](https://sharp.pixelplumbing.com/) for image processing
- [Rembg](https://github.com/danielgatis/rembg) for background removal
- [Material-UI](https://mui.com/) for UI components 