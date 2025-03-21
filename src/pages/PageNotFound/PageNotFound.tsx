import * as React from 'react';
import { NavLink } from 'react-router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const PageNotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
      </Box>
      <Box sx={{ my: 4 }}>
        <NavLink to="/">Back to Home</NavLink>
      </Box>
    </Container>
  );
};
