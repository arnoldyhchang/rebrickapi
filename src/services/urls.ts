export enum EApiUrlKey {
  COLORS = 'colors',
  COLOR_DETAILS = 'colorDetails',
  USER_TOKEN_POST = 'userTokenPost',
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
    colors: ({ page, pageSize }) => `/lego/colors/?page=${page}&page_size=${pageSize}&inc_color_details=0`,
    colorDetails: ({ colorId }) => `/lego/colors/${colorId}/`,
    userTokenPost: () => `/users/_token/`,
  },
};
