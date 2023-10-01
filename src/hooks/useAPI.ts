import { useEffect, useState } from 'react';

const useAPI = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const response = await fetch(url);
      if (!response.ok) {
        setError('No data')
      }

      const responseData = await response.json() as T;
      return responseData
    };

    fetchData()
      .then((response) => {
        if (response) {
          setData(response)
        }
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => setIsLoading(false));
  }, [url]);

  return { data, isLoading, error };
};

export { useAPI };
