import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { ErrorResponse, ServerError } from '../../types';
import { envConfig } from '../../envConfg';

interface IPostParams<TResponse> {
  url: string;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: ServerError) => void;
  isFormData?: boolean;
}

export const useQueryPost = <TResponse, TPayload>({
  url,
  onSuccess,
  onError,
  isFormData = false,
}: IPostParams<TResponse>) => {
  const setData = async <TResponse>(payload: TPayload): Promise<TResponse> => {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `key ${envConfig.apiKey}`,
      },
    };
    if (isFormData) {
      config = {
        headers: {
          ...config.headers,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };
    }
    const response: AxiosResponse<TResponse> = await axios.post<TResponse>(url, payload, config);
    return response.data;
  };

  const handleSuccess = (data: TResponse) => {
    console.log('*** handleSuccess ***', data);
    if (onSuccess) {
      onSuccess(data);
    }
  };

  const handleError = (axiosError: AxiosError<ErrorResponse>) => {
    // map to app error type
    const appError: ServerError = {
      message: axiosError.message || 'unknown error while setting data',
      status: axiosError.status || 0,
      code: axiosError.code || 'UNKNOWN',
      apiName: 'rebrickable API',
      detail: axiosError.response?.data?.detail,
    };
    if (onError) {
      onError(appError);
    }
  };

  return useMutation<TResponse, AxiosError<ErrorResponse>, TPayload>({
    mutationFn: setData,
    onSuccess: handleSuccess,
    onError: handleError,
  });
};
