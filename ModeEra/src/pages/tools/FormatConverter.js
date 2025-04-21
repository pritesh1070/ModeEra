import React, { useState, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  LinearProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
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

const ImagePreview = styled(Box)({
  width: '100%',
  height: '300px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
});

const FormatConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetFormat, setTargetFormat] = useState('png');
  const [error, setError] = useState(null);
  const [originalFormat, setOriginalFormat] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setError(null);
      const format = file.name.split('.').pop().toLowerCase();
      setOriginalFormat(format);
      
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result);
        processImage(reader.result, format);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
    },
    multiple: false,
  });

  const processImage = async (imageData, originalFormat) => {
    if (originalFormat === targetFormat) {
      setError('Please select a different target format');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    
    try {
      // Simulate processing with progress updates
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // In a real application, you would send the image to your backend
      // and convert it using a library like sharp
      // For now, we'll just simulate the processed image
      setProcessedImage(imageData);
    } catch (error) {
      console.error('Error processing image:', error);
      setError('Error converting image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormatChange = (event) => {
    const newFormat = event.target.value;
    setTargetFormat(newFormat);
    if (originalImage && originalFormat !== newFormat) {
      processImage(originalImage, originalFormat);
    }
  };

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement('a');
      link.href = processedImage;
      link.download = `converted-image.${targetFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const supportedFormats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpg', label: 'JPG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'webp', label: 'WebP' },
    { value: 'gif', label: 'GIF' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Format Converter
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph align="center">
        Convert your images between different formats with ease. Supports PNG, JPG, JPEG, WebP, and GIF.
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

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
            Supports PNG, JPG, JPEG, WebP, GIF
          </Typography>
        </UploadArea>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Original Image
              </Typography>
              <ImagePreview>
                <img src={originalImage} alt="Original" />
              </ImagePreview>
              <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                Format: {originalFormat?.toUpperCase()}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Converted Image
              </Typography>
              <ImagePreview>
                {processedImage ? (
                  <img src={processedImage} alt="Converted" />
                ) : (
                  <Typography color="text.secondary">
                    Select target format to convert
                  </Typography>
                )}
              </ImagePreview>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Target Format</InputLabel>
                <Select
                  value={targetFormat}
                  label="Target Format"
                  onChange={handleFormatChange}
                >
                  {supportedFormats.map((format) => (
                    <MenuItem
                      key={format.value}
                      value={format.value}
                      disabled={format.value === originalFormat}
                    >
                      {format.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
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
                  setOriginalFormat(null);
                  setTargetFormat('png');
                  setError(null);
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
            Converting image... {progress}%
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default FormatConverter; 