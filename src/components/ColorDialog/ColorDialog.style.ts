import { css } from '@emotion/react';
import { theme } from '../../theme';

// just illustrate to use css for style separation

export const ColorDialogBoxStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 1px;
  border: 1px solid ${theme.palette.grey[300]};
`;

export const ColorDialogContentStyle = css`
  min-width: 600px;
`;
