import { css } from '@emotion/react';
import { theme } from '../../theme';

export const SideBarStyle = css`
  display: flex;
  flex-direction: column;
  min-width: 160px;
  background-color: ${theme.palette.secondary.dark};
  color: ${theme.palette.text.secondary};
  border-right: 2px solid #333859;
`;

export const SideBarMenuItem = css`
  margin: 10px;
  color: ${theme.palette.grey[500]};
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    opacity: 70%;
  }
`;

export const SideBarMenuItemActive = css`
  color: ${theme.palette.text.secondary};
  font-weight: 700;
`;
