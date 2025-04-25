/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { PageContentStyle } from '../../styles/global.style';
import { ThemeAutoComplete } from '../../components/ThemeAutoComplete';

export const LegoSets = () => {
  const [themeId, setThemeId] = useState(0);

  const handleThemeSelect = (selectedThemeId: number) => {
    setThemeId(selectedThemeId);
  };

  return (
    <div css={PageContentStyle}>
      <Box sx={{ maxWidth: 600, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Lego Sets
        </Typography>
        <ThemeAutoComplete themeId={themeId} onSelect={handleThemeSelect} />
        <Box sx={{ p: 2 }}>
          <div>TBD you have selected theme id = {themeId}</div>
        </Box>
      </Box>
    </div>
  );
};
