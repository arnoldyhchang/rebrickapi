export enum EApiUrlKey {
  COLORS = 'colors',
  COLOR_DETAILS = 'colorDetails',
  USER_TOKEN_POST = 'userTokenPost',
  USER_PROFILE = 'userProfile',
  USER_BADGE = 'userBadge',
}

export type ApiQueryParams = {
  page?: number;
  pageSize?: number;
  ordering?: string;
  colorId?: number;
  userToken?: string;
  badgeId?: number;
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
    userProfile: ({ userToken }) => `/users/${userToken}/profile/`,
    userBadge: ({ badgeId }) => `/users/badges/${badgeId}/`,
  },
};
