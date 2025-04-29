import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Box, CircularProgress, Autocomplete, TextField } from '@mui/material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, ILegoTheme, ILegoThemesResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';

interface IProps {
  themeId: number; // 0 for empty
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
    if (page === 0 && themeId > 0 && fullThemeList.length > 0) {
      const selected = fullThemeList.find((item) => item.id === themeId) ?? null;
      setSelectedTheme(selected);
    }
  }, [page, themeId, fullThemeList]);

  const handleSelect = (ev: React.SyntheticEvent<Element, Event>, value: ILegoTheme | null) => {
    if (value) {
      const selected = fullThemeList.find((item) => item.id === value.id) || null;
      setSelectedTheme(selected);
      onSelect(value.id);
    } else {
      setSelectedTheme(null);
      onSelect(0);
    }
  };

  return (
    <Box sx={{ width: 300 }}>
      <Autocomplete
        options={fullThemeList}
        getOptionLabel={(option) => option.name}
        value={selectedTheme}
        onChange={handleSelect}
        loading={page !== 0}
        loadingText={'Loading...'}
        isOptionEqualToValue={(option, value) => {
          return option.id === value.id;
        }}
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
            sx={{ borderRadius: 2 }}
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
        sx={{ backgroundColor: 'white', borderRadius: 2 }}
      />
    </Box>
  );
};
