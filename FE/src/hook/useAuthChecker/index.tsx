// src/hooks/useTokenChecker.ts

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenChecker = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null); // Specify the type explicitly
  const navigate = useNavigate();

  useEffect(() => {
    console.log('document', document.cookie)
    const storedAccessToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('accessToken='))
      ?.split('=')[1];
    const storedRefreshToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('refreshToken='))
      ?.split('=')[1];

    setAccessToken(storedAccessToken || null);
    setRefreshToken(storedRefreshToken || null);

    if (!storedAccessToken) {
      navigate('/login');
    }
  }, [navigate]);

  const isAuthenticated = () => {
    return !!accessToken;
  };

  return {
    accessToken,
    refreshToken,
    isAuthenticated,
  };
};

export default useTokenChecker;
