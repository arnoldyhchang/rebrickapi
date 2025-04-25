import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Box, CircularProgress, Autocomplete, TextField } from '@mui/material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, ILegoTheme, ILegoThemesResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';

interface IProps {
  themeId: number;
  onSelect: (themeId: number) => void;
}

export const ThemeAutoComplete = ({ themeId, onSelect }: IProps) => {
  const pageSize = 100;
  // this is utilized to handle calling useEffect twice due to strict mode
  const lastPageRef = useRef<number>(0);
  const [totalThemes, setTotalThemes] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<ILegoTheme | null>(null);
  const [fullThemeList, setFullThemeList] = useState<ILegoTheme[]>([]);
  const [page, setPage] = useState(1);
  const apiUrl = useMemo(() => {
    return envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.LEGO_THEMES]({ page, pageSize });
  }, [page, pageSize]);
  const { data, isSuccess, isLoading } = useQueryGet<PagedDataType<ILegoThemesResponse>>({
    url: apiUrl,
    enabled: page !== 0,
    refetchOnMount: false,
  });

  // call APIs to fetch and accumlate all themes
  useEffect(() => {
    // lastPageRef is utilized to safeguard strict mode calling useEffect twice here
    if (isSuccess && data && lastPageRef.current !== page) {
      // to avoid state closure in fullThemeList, use functional state update
      setFullThemeList((prev) => {
        const newThemeList = [...prev, ...data.results];
        setTotalThemes(newThemeList.length);
        return newThemeList;
      });

      if (data.next) {
        lastPageRef.current = page;
        setPage(page + 1);
      } else {
        // set to zero to indicate data fetch is completed
        setPage(0);
      }
    }
  }, [isSuccess, page, data, fullThemeList, themeId]);

  // set the user selection, use fullThemeList here to ensure object reference will be the same
  useEffect(() => {
    if (apiUrl === '' && themeId > 0 && fullThemeList.length > 0) {
      const selected = fullThemeList.find((item) => item.id === themeId) ?? null;
      setSelectedTheme(selected);
    }
  }, [apiUrl, themeId, fullThemeList]);

  const handleSelect = (ev: React.SyntheticEvent<Element, Event>, value: ILegoTheme | null) => {
    onSelect(value ? value.id : 0);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={fullThemeList}
        getOptionLabel={(option) => option.name}
        value={selectedTheme}
        onChange={handleSelect}
        loading={apiUrl !== ''}
        loadingText={'Loading...'}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Select a theme (${totalThemes})`}
            variant="outlined"
            // still required for end adornments; ignore deprecation warning
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <Box component="li" {...props} key={option.id}>
              {option.id}: {option.name}
            </Box>
          );
        }}
        slotProps={{
          listbox: {
            style: {
              maxHeight: '600px', // limit the height of the dropdown list
              overflowY: 'auto',
            },
          },
        }}
      />
    </Box>
  );
};
