import React from 'react';
import { Box, Typography } from '@mui/material';

interface IProps {
  isOpen: boolean;
  infoText: string;
}

export const DebugPanel = ({ isOpen, infoText }: IProps) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        left: 16,
        width: 300,
        maxHeight: 200,
        bgcolor: '#f5f5f5',
        color: '#333',
        p: 2,
        boxShadow: 4,
        borderRadius: 2,
        overflowY: 'auto',
        fontFamily: 'monospace',
        zIndex: 1300, // ensure it's above other content
      }}
    >
      <Typography variant="subtitle2" gutterBottom>
        Debug Info
      </Typography>
      <pre style={{ margin: 0 }}>{infoText}</pre>
    </Box>
  );
};
