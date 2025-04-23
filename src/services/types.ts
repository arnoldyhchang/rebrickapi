export interface ServerError {
  code: string;
  message: string;
  status: number;
  apiName: string;
  detail: string | undefined;
}

// type the error shape from rebrickable API
export interface ErrorResponse {
  detail: string;
}

export interface IPagination {
  count: number;
  next: string;
  previous: string;
}

export type PagedDataType<T> = T & IPagination;

export interface IColorEntry {
  id: number;
  name: string;
  rgb: string;
  is_trans: false;
  // we don't care the rest of the stuff in the list, we set a flag to omit them in the call
}

export interface IColorEntryResponse {
  results: IColorEntry[];
}

export interface IExternalColorDetails {
  ext_ids: (number | null)[];
  ext_descrs: string[][];
}

export interface IColorDetailsResponse extends IColorEntry {
  external_ids: {
    [externalName: string]: IExternalColorDetails;
  };
}

export interface IUserTokenPayload {
  username: string; // email or username
  password: string;
}

export interface IUserTokenResponse {
  user_token: string;
}

export interface IUserRewards {
  points: number;
  level: number;
  badges: number[];
}

export interface IUserProfileResponse {
  user_id: number;
  username: string;
  email: string;
  last_activity: string;
  last_ip: string;
  location: string;
  rewards: IUserRewards;
  avatar_img: string;
}

export interface IUserBadge {
  id: number;
  code: string;
  level: number;
  name: string;
  descr: string;
}
