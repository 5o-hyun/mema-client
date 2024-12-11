import axios from 'axios';
import { redirect } from 'next/navigation';
import { useUserRoleStore } from '@/store/userRoleStore';

const baseURL = `${process.env.NEXT_PUBLIC_SERVER_URL}`;

export const defaultAxios = axios.create({
  baseURL,
  withCredentials: true,
});

// Request Interceptor
defaultAxios.interceptors.request.use((config) => {
  const { userRole } = useUserRoleStore.getState();
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  if (userRole === 'ROLE_CUSTOM' && token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor
defaultAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { userRole } = useUserRoleStore.getState();

    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined' && userRole === 'ROLE_CUSTOM') {
        localStorage.removeItem('authToken');
        redirect('/');
      }
    }

    return Promise.reject(error);
  },
);
