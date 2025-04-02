import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { envConfig } from '../../envConfg';
import { ServerError } from '../../types';

interface IProps {
  url: string;
}

const fetchData = async <TData>(url: string): Promise<TData> => {
  try {
    const response: AxiosResponse<TData> = await axios.get<TData>(url + `&key=${envConfig.apiKey}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    // map to app error type
    const appError: ServerError = {
      message: axiosError.message || 'unknown error while fetching data',
      status: axiosError.status || 0,
      code: axiosError.code || 'UNKNOWN',
      apiName: 'rebrickable API',
    };
    throw appError;
  }
};

export const useQueryGet = <TData>({ url }: IProps) => {
  return useQuery<TData, ServerError>({
    queryKey: [url],
    queryFn: () => fetchData<TData>(url),
    retry: 2, // retries fetching data twice before failing,
    staleTime: 5000, // prevent unnecessary refetching for five seconds
  });
};
