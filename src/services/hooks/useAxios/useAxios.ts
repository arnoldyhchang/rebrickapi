import { useEffect, useState } from 'react';
import axios from 'axios';
import { envConfig } from '../../envConfg';

interface IProps {
  url: string;
}

export const useAxios = <TData>({ url }: IProps) => {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const axiosData = async () => {
      try {
        const response = await axios.get<TData>(url + `&key=${envConfig.apiKey}`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoading(false);
        setData(response.data);
      } catch (err) {
        setLoading(false);
        setError((err as Error).message);
      }
    };

    axiosData();
  }, [url]);

  return { data, loading, error };
};
