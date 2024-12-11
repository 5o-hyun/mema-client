import { defaultAxios } from '@/lib/api/defaultAxios';

// 로그인
export const login = async (data: { email: string; password: string }) => {
  const response = await defaultAxios.post(`/login`, data);
  if (typeof window !== 'undefined') {
    const authToken = response.headers['authentication'].slice(7); // 'Bearer '제거
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      console.error('Authentication token is missing in headers');
    }
  }
  return response;
};

// 회원가입
export const signup = async (data: { email: string; password: string; nickname: string }) => {
  return await defaultAxios.post(`/join/custom`, data);
};

// 유저 정보 조회
export const getUser = async () => {
  return await defaultAxios.get(`/mypage`);
};

// 유저 정보 수정
export const updateUser = async (data: { nickname: string; puzId: number; puzColor: string }) => {
  return await defaultAxios.patch(`/mypage`, data);
};
