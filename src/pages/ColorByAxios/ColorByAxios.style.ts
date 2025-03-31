import { css } from '@emotion/react';
import { theme } from '../../theme';

export const ColorContainerStyle = css`
  display: flex;
`;

export const ColorRowStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

export const ColorBoxStyle = css`
  width: 30px;
  height: 30px;
  border: 1px solid ${theme.palette.grey[700]};
  margin-right: 10px;
`;
