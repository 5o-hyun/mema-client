import { defaultAxios } from '@/lib/api/defaultAxios';
import { mockMeetData } from './mock/meets';
import { AxiosResponse } from 'axios';
import { Meet } from '@/types/meets';

// 미팅 개별조회
export const getMeet = async (meetId: number): Promise<AxiosResponse<Meet>> => {
  console.log(`Mock API 호출: /meets/${meetId}`);
  return new Promise<AxiosResponse<Meet>>((resolve) =>
    setTimeout(
      () =>
        resolve({
          data: mockMeetData,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {},
          request: {},
        } as AxiosResponse<Meet>),
      500,
    ),
  );
};
// export const getMeet = async (meetId: number) => {
//   return await defaultAxios.get(`/meets/${meetId}`);
// };

// 미팅 개별수정
export const updateMeet = async ({ meetId, meetName }: { meetId: number; meetName: string }) => {
  console.log(`Mock API 호출: /meets/${meetId} PATCH, 새로운 미팅명: ${meetName}`);
  if (meetId === mockMeetData.meetId) {
    mockMeetData.meetName = meetName;
  }
  return new Promise((resolve) => setTimeout(() => resolve(meetName), 500));
};
// export const updateMeet = async (meetId: number, meetName: string) => {
//   await defaultAxios.patch(`/meets/${meetId}`, { meetName });
// };

// 미팅 개별삭제
export const deleteMeet = async (meetId: number): Promise<AxiosResponse> => {
  console.log(`Mock API 호출: /meets/${meetId} DELETE`);
  return new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => {
      resolve({
        data: null,
        status: 204,
        statusText: 'OK',
        headers: {},
        config: {},
        request: {},
      } as AxiosResponse);
    }, 500),
  );
};
// export const deleteMeet = async (meetId: number) => {
//   await defaultAxios.delete(`/meets/${meetId}`);
// };
