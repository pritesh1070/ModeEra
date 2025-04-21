import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Slider,
  Grid,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import CompareIcon from '@mui/icons-material/Compare';
import { useDropzone } from 'react-dropzone';

const UploadArea = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  cursor: 'pointer',
  border: `2px dashed ${theme.palette.primary.main}`,
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: '400px',
  overflow: 'hidden',
});

const ComparisonSlider = styled(Slider)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  zIndex: 2,
});

const BackgroundRemover = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [comparisonValue, setComparisonValue] = useState(50);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        processImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: false,
  });

  const processImage = async (imageData) => {
    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate processing with progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // In a real application, you would send the image to your backend
      // and use a service like rembg to remove the background
      // For now, we'll just simulate the processed image
      setProcessedImage(imageData);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = 'background-removed.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Background Remover
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Remove backgrounds from your images with a single click. Perfect for product photos, portraits, and more.
      </Typography>

      {!originalImage ? (
        <UploadArea {...getRootProps()}>
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive
              ? 'Drop the image here'
              : 'Drag and drop an image here, or click to select'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supports PNG, JPG, JPEG
          </Typography>
        </UploadArea>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <ImageContainer>
              <Box
                component="img"
                src={originalImage}
                alt="Original"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  clipPath: `inset(0 ${100 - comparisonValue}% 0 0)`,
                }}
              />
              <Box
                component="img"
                src={processedImage}
                alt="Processed"
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  clipPath: `inset(0 0 0 ${comparisonValue}%)`,
                }}
              />
              <ComparisonSlider
                value={comparisonValue}
                onChange={(_, value) => setComparisonValue(value)}
                aria-labelledby="comparison-slider"
              />
            </ImageContainer>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
                disabled={!processedImage}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  setOriginalImage(null);
                  setProcessedImage(null);
                }}
              >
                Upload New Image
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}

      {isProcessing && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Processing image... {progress}%
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default BackgroundRemover; 