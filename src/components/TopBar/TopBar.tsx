/** @jsxImportSource @emotion/react */
import React from 'react';
import Typography from '@mui/material/Typography';
import { TopBarStyle } from './TopBar.style';

export const TopBar: React.FC = () => {
  return (
    <div css={TopBarStyle}>
      <Typography variant="h5" align="left" color="inherit">
        Rebrickable API Testbed
      </Typography>
    </div>
  );
};
