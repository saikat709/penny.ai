import axios, { AxiosError, type AxiosInstance } from 'axios';
import {jwtDecode, type JwtPayload } from 'jwt-decode';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded.exp) return true;
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
};

const getTokens = () => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
});

const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, {
      refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    
    return accessToken;
  } catch (error) {
    
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    throw error;
  }
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const { accessToken, refreshToken } = getTokens();

    if (!accessToken || !refreshToken) {
      return config;
    }

    if (isTokenExpired(accessToken)) {
      if (!isTokenExpired(refreshToken)) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          config.headers.Authorization = `Bearer ${newAccessToken}`;
        } catch {
          delete config.headers.Authorization;
        }
      } else {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        delete config.headers.Authorization;
      }
    } else {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;