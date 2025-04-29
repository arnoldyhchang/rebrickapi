import React from 'react';
import { Box, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface IProps {
  isOpen: boolean;
  name: string;
  imageUrl: string;
  onCloseClick: () => void;
}

export const ImageDialog = ({ isOpen, name, imageUrl, onCloseClick }: IProps) => {
  const handleClose = () => {
    onCloseClick();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        {name}
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          component="img"
          src={imageUrl || undefined}
          alt={name}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: 1,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
