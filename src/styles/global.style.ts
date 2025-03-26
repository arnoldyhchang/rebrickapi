import { css } from '@emotion/react';
import { theme } from '../theme';

export const PageContentStyle = css`
  position: relative;
  width: 100%;
  height: calc(100vh - 40px);
  background-color: ${theme.palette.background.paper};
  overflow-y: auto;
`;
