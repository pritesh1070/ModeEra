import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Services Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Link component={RouterLink} to="/tools/background-remover" color="inherit">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/tools/image-enhancer" color="inherit">
                  Image Enhancer
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/tools/format-converter" color="inherit">
                  Format Converter
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Legal Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Link component={RouterLink} to="/terms" color="inherit">
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/privacy" color="inherit">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/cookies" color="inherit">
                  Cookie Policy
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Company Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Link component={RouterLink} to="/about" color="inherit">
                  About Us
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/pricing" color="inherit">
                  Pricing
                </Link>
              </li>
              <li>
                <Link component={RouterLink} to="/faq" color="inherit">
                  FAQ
                </Link>
              </li>
            </Box>
          </Grid>

          {/* Contact Section */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0 }}>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Email: support@modeera.com
                </Typography>
              </li>
              <li>
                <Typography variant="body2" color="text.secondary">
                  Phone: +1 (555) 123-4567
                </Typography>
              </li>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ModeEra. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Powered by ModeEra
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 