import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useQueryGet } from '../../services/hooks/useQueryGet';
import { envConfig } from '../../services/envConfg';
import { PagedDataType, ILegoThemesResponse } from '../../services/types';
import { API_URL_MAP, EApiUrlKey } from '../../services/urls';

// @TODO, use infinite get to get more data, for now, just allow first 100 themes to be selected

export const ThemeSelect = () => {
  const pageSize = 100;
  const [page] = useState(1);
  const [selected, setSelected] = useState<number>(-1);
  const url = envConfig.apiUrl + API_URL_MAP.urls[EApiUrlKey.LEGO_THEMES]({ page, pageSize });
  const { data } = useQueryGet<PagedDataType<ILegoThemesResponse>>({ url });

  const handleSelect = (event: SelectChangeEvent<number>) => {
    setSelected(Number(event.target.value));
  };

  return (
    <Box sx={{ width: 300 }}>
      <FormControl fullWidth disabled={!data}>
        <InputLabel id="theme-select-label">Lego Theme</InputLabel>
        <Select
          labelId="theme-select-label"
          defaultValue={-1}
          value={selected}
          label="Lego Theme"
          onChange={handleSelect}
          MenuProps={{
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left',
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'left',
            },
          }}
        >
          <MenuItem value={-1}>Please choose a theme</MenuItem>
          {data?.results.map((e) => (
            <MenuItem key={e.id} value={e.id}>
              {e.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
