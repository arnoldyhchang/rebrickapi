/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, IColorEntryResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { PageContentStyle } from '../../styles/global.style';
import { ColorRowStyle, ColorBoxStyle } from './ColorByQuery.style';

export const ColorByQuery = () => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
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

  return (
    <div css={PageContentStyle}>
      <Stack direction="row" alignItems="center">
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
        <div key={index} css={ColorRowStyle}>
          <p css={ColorBoxStyle} style={{ background: `#${e.rgb}` }}></p>
          <p>
            id: {e.id}, name: {e.name}, color: {e.rgb}
          </p>
        </div>
      ))}
    </div>
  );
};
