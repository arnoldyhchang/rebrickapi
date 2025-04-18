import { envConfig } from './envConfg';

export enum EApiUrlKey {
  COLORS = 'colors',
  COLOR_DETAILS = 'colorDetails',
}

export type ApiQueryParams = {
  page?: number;
  pageSize?: number;
  ordering?: string;
  colorId?: number;
};

interface IApiUrlMap {
  urls: {
    [key in EApiUrlKey]: (params: ApiQueryParams) => string;
  };
}

export const API_URL_MAP: IApiUrlMap = {
  urls: {
    colors: ({ page, pageSize }) =>
      `/colors?page=${page}&page_size=${pageSize}&key=${envConfig.apiKey}&inc_color_details=0`,
    colorDetails: ({ colorId }) => `/colors/${colorId}?key=${envConfig.apiKey}`,
  },
};
