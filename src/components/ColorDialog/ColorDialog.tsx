/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid2,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { IColorDetailsResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { ColorDialogBoxStyle, ColorDialogContentStyle } from './ColorDialog.style';

interface IProps {
  isOpen: boolean;
  colorId: number;
  onCloseClick: () => void;
}

export const ColorDialog = ({ isOpen, colorId, onCloseClick }: IProps) => {
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.COLOR_DETAILS]({ colorId });
  const { data, isLoading, error } = useQueryGet<IColorDetailsResponse>({ url, enabled: isOpen });

  return (
    <Dialog open={isOpen}>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="Center">
          <Box display="flex" flexDirection={'row'} gap={1}>
            <Box
              css={ColorDialogBoxStyle}
              sx={{
                backgroundColor: '#' + data?.rgb,
              }}
            />
            <Typography variant="h5">
              {data?.name}(Id: {data?.id})
            </Typography>
          </Box>
          <IconButton onClick={onCloseClick}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent color="primary" css={ColorDialogContentStyle}>
        {isLoading && <CircularProgress color={'primary'} size={30} />}
        {error && (
          <div>
            API error: {error?.message}, {error?.status}, {error?.code}, {error?.apiName}
          </div>
        )}
        {data &&
          Object.entries(data.external_ids).map(([key, data]) => (
            <Paper key={key} elevation={2} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                {key}
              </Typography>
              <Grid2 container spacing={2}>
                <Grid2 size={6}>
                  <Typography variant="subtitle2">ext_ids</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography variant="subtitle2">ext_descrs</Typography>
                </Grid2>
                {data.ext_ids.map((id, index) => (
                  <React.Fragment key={index}>
                    <Grid2
                      container
                      spacing={2}
                      size={12}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'background.default' : 'grey.100',
                        py: 1,
                      }}
                    >
                      <Grid2 size={6}>
                        <Typography>{id}</Typography>
                      </Grid2>
                      <Grid2 size={6}>
                        <Typography>{data.ext_descrs[index].join(', ')}</Typography>
                      </Grid2>
                    </Grid2>
                    {/* Divider across full width after each row */}
                    {data.ext_ids.length > index + 1 && (
                      <Grid2 size={12}>
                        <Divider />
                      </Grid2>
                    )}
                  </React.Fragment>
                ))}
              </Grid2>
            </Paper>
          ))}
      </DialogContent>
    </Dialog>
  );
};
