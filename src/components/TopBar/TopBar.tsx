/** @jsxImportSource @emotion/react */
import React from 'react';
import { TopBarStyle } from './TopBar.style';

export const TopBar: React.FC = () => {
  return (
    <div css={TopBarStyle}>
      <div>Top Bar Content</div>
    </div>
  );
};
