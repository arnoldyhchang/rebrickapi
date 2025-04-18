/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, IColorEntryResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { PageContentStyle } from '../../styles/global.style';
import { ColorDialog } from '../../components/ColorDialog';
import { ColorRowStyle, ColorBoxStyle } from './ColorByQuery.style';

export const ColorByQuery = () => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const [colorId, setColorId] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.COLORS]({ page, pageSize });
  const { data, isLoading, error } = useQueryGet<PagedDataType<IColorEntryResponse>>({ url });
  const totalPages = data?.count ? Math.ceil(data.count / pageSize) : 0;

  if (isLoading) return <div>Loading...</div>;

  if (error || data?.results === null)
    return (
      <div>
        *Error*: {error?.message}, {error?.status}, {error?.code}, {error?.apiName}
      </div>
    );

  const handleOnClickPrevious = () => {
    setPage(page - 1);
  };

  const handleOnClickNext = () => {
    setPage(page + 1);
  };

  const handleOnColorClick = (ev: React.SyntheticEvent<HTMLDivElement>) => {
    const colorIdStr = ev.currentTarget.getAttribute('data-color-id');
    setColorId(colorIdStr ? Number(colorIdStr) : 0);
    setIsOpen(true);
  };

  const handleDialogCloseClick = () => {
    setIsOpen(false);
  };

  return (
    <div css={PageContentStyle}>
      <Stack direction="row" alignItems="center" spacing={4}>
        <IconButton onClick={handleOnClickPrevious} disabled={data?.previous === null}>
          <ArrowBackIos />
        </IconButton>
        <Typography variant="body1">
          Page {page} of {totalPages}
        </Typography>
        <IconButton onClick={handleOnClickNext} disabled={data?.next === null}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      {data?.results.map((e, index) => (
        <div key={index} data-color-id={e.id} css={ColorRowStyle} onClick={handleOnColorClick}>
          <p css={ColorBoxStyle} style={{ background: `#${e.rgb}` }}></p>
          <p>
            id: {e.id}, name: {e.name}, color: {e.rgb}
          </p>
        </div>
      ))}
      <ColorDialog isOpen={isOpen} colorId={colorId} onCloseClick={handleDialogCloseClick} />
    </div>
  );
};
