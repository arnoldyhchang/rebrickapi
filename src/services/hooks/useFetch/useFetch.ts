import { useEffect, useState } from 'react';
import { envConfig } from '../../envConfg';

interface IProps {
  url: string;
}

export const useFetch = <TData>({ url }: IProps) => {
  const [data, setData] = useState<TData|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // const headers = new Headers();
      // headers.append('key', envConfig.apiKey);
      try {
        // const response = await fetch(url, { headers });
        const response = await fetch(url + `&key=${envConfig.apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json() as TData;
        setData(result);
        setLoading(false);
      } catch(err) {
        setLoading(false);
        setError((err as Error).message);
      }
    };

    fetchData(); 
  }, [url]);

  return { data, loading, error };
};
