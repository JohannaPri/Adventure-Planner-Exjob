import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

interface AmadeusApiProps {
  endpoint: string;
  children: (
    data: unknown,
    loading: boolean,
    error: string | null
  ) => React.ReactNode;
}

const AmadeusAPI: React.FC<AmadeusApiProps> = ({ endpoint, children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [data, setData] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getAccessToken = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<AccessTokenResponse> = await axios.post(
        "https://m2.eeazy.se/rapapi/refreshtoken"
      );

      const token = response.data.access_token;
      setAccessToken(token);
      
    } catch (err) {
      console.error("Error fetching access token: ", err);
      setError((err as any).response?.data?.message || "Failed to fetch access token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
      fetchApiData();
    }
  }, [accessToken]);

  const fetchApiData = async () => {
    if (!accessToken) return;

    setLoading(true);
    setError(null);

    try {
      console.log('TOKEN: ', accessToken);
      const response = await axios.get(endpoint, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setData(response.data);
    } catch (err) {
      console.error(`API call error: ${err}`);
      setError("Failed to fetch data from API");
    } finally {
      setLoading(false);
    }
  };

  return <>{children(data, loading, error)}</>;
};

export default AmadeusAPI;