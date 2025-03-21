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
