/** @jsxImportSource @emotion/react */
import React from 'react';
import { SideBarStyle } from './SideBar.style';

export const SideBar: React.FC = () => {
  return (
    <div css={SideBarStyle}>
      <div>Menu 1</div>
      <div>Menu 2</div>
      <div>Menu 3</div>
    </div>
  );
};
