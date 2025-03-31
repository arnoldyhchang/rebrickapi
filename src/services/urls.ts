export enum EApiUrlKey {
  COLORS = 'colors',
}

export type ApiQueryParams = {
  page?: number;
  pageSize?: number;
  ordering?: string;
};

interface IApiUrlMap {
  urls: {
    [key in EApiUrlKey]: (params: ApiQueryParams) => string;
  };
}

export const API_URL_MAP: IApiUrlMap = {
  urls: {
    colors: ({ page, pageSize }) => `/colors?page=${page}&page_size=${pageSize}`,
  },
};
