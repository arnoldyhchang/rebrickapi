/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Stack, IconButton, Typography } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useFetch } from '../../services/hooks/useFetch';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, IColorEntryResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { PageContentStyle } from '../../styles/global.style';
import { ColorRowStyle, ColorBoxStyle } from './Color.style';

export const Color = () => {
  const pageSize = 20;
  const [page, setPage] = useState(1);
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.COLORS]({ page, pageSize });
  const { data, loading, error } = useFetch<PagedDataType<IColorEntryResponse>>({ url });
  const totalPages = data?.count ? Math.ceil(data.count / pageSize) : 0;

  console.log(data?.results);
  if (loading) return <div>Loading...</div>;

  if (error || data?.results === null) return <div>Error: {error}</div>;

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
