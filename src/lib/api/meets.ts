import { defaultAxios } from '@/lib/api/defaultAxios';

// 미팅 개별조회
export const getMeet = async (meetId: number) => {
  return await defaultAxios.get(`/meets/${meetId}`);
};

// 미팅 개별수정
export const updateMeet = async (data: { meetId: number; meetName: string }) => {
  await defaultAxios.patch(`/meets/${data.meetId}`, data.meetName);
};

// 미팅 개별삭제
export const deleteMeet = async (meetId: number) => {
  await defaultAxios.delete(`/meets/${meetId}`);
};

// 미팅 생성
export const createMeet = async (data: { meetName: string }) => {
  return await defaultAxios.post(`/meets`, data);
};

// 미팅 전체 조회
export const getHomeMeets = async () => {
  return await defaultAxios.get(`/meets/home`);
};

// 참여 코드 입력
export const joinMeet = async (data: { joinCode: string }) => {
  return await defaultAxios.post(`/meets/join`, data);
};
