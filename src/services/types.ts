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
}

export interface IColorEntryResponse {
  results: IColorEntry[];
}
