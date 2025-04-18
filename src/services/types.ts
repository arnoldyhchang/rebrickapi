export interface ServerError {
  code: string;
  message: string;
  status: number;
  apiName: string;
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
