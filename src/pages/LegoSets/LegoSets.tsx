/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { Box, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { PageContentStyle } from '../../styles/global.style';
import { useDebounce } from '../../hooks/useDebounce';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, ILegoSetsResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';
import { ThemeAutoComplete } from '../../components/ThemeAutoComplete';
import { LegoSetList } from '../../components/LegoSetList';
import { ListPagination } from '../../components/ListPagination';

const PAGE_SIZE = 20;

export const LegoSets = () => {
  const [themeId, setThemeId] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const debouncedSearchText = useDebounce(searchText, 800);

  const searchParams = new URLSearchParams();
  searchParams.append('ordering', 'year');
  if (debouncedSearchText) {
    searchParams.append('search', debouncedSearchText);
  }

  const apiUrl =
    envConfig.apiUrl +
    API_URL_MAP.urls[EApiUrlKey.LEGO_SETS]({ page, pageSize: PAGE_SIZE, themeId }) +
    '&' +
    searchParams.toString();

  const { data, isLoading, error } = useQueryGet<PagedDataType<ILegoSetsResponse>>({
    url: apiUrl,
    refetchOnMount: false,
    enabled: themeId !== 0,
  });

  const handleThemeSelect = (selectedThemeId: number) => {
    setPage(1);
    setThemeId(selectedThemeId);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSearchTextChange = (event: React.ChangeEvent<{ value: string }>) => {
    setSearchText(event.target.value);
  };

  const handleSearchClearClick = () => {
    setSearchText('');
  };

  return (
    <div css={PageContentStyle}>
      <Box sx={{ maxWidth: 600, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Lego Sets
        </Typography>
      </Box>
      <Box sx={{ m: 2, p: 2, display: 'flex', flexDireciton: 'row', backgroundColor: '#ddd', gap: 2 }}>
        <ThemeAutoComplete themeId={themeId} onSelect={handleThemeSelect} />
        <TextField
          type="text"
          value={searchText}
          onChange={handleSearchTextChange}
          placeholder={'Search text...'}
          sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 1, width: 350 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {debouncedSearchText && (
                    <IconButton onClick={handleSearchClearClick} size="small">
                      <Clear fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <Divider />
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && (
        // @TODO refactor into component
        <Box
          sx={{
            backgroundColor: '#f44336', // Red background
            color: 'white', // White text
            padding: '16px', // Some padding around the content
            textAlign: 'center', // Center the text
            margin: '16px',
          }}
        >
          <Typography variant="h6">
            *Error*: {error?.message}, {error?.status}, {error?.code}, {error?.apiName}
          </Typography>
        </Box>
      )}
      {data && themeId !== 0 && (
        <ListPagination
          currentPage={page}
          totalCount={data.count}
          pageSize={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
      <LegoSetList sets={data?.results || []} />
    </div>
  );
};
