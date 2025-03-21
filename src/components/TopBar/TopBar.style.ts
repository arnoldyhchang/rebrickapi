import { css } from '@emotion/react';
import { theme } from '../../theme';

export const TopBarStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  background-color: ${theme.palette.primary.light};
  border-bottom: 2px solid #333859;
  padding: 10px;
`;
