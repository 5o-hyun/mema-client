import { defaultAxios } from './defaultAxios';

// 정산 전체조회
export const getBills = async (meetId: number) => {
  return await defaultAxios.get(`/meets/${meetId}/charge/total`);
};

// 정산 개별조회
export const getBill = async ({ meetId, chargeId }: { meetId: number; chargeId: number }) => {
  return await defaultAxios.get(`/meets/${meetId}/charge/${chargeId}`);
};

// 정산 나의피정산조회
export const getBillPayfor = async (meetId: number) => {
  return await defaultAxios.get(`/meets/${meetId}/charge/payfor`);
};

// 정산 생성
export const createBill = async ({
  meetId,
  data,
}: {
  meetId: number;
  data: {
    content: string;
    totalPrice: number;
    peopleNumber: number;
    memberIds: number[];
  };
}) => {
  await defaultAxios.post(`/meets/${meetId}/charge`, data);
};

// 정산 수정

export const updateBill = async ({
  meetId,
  chargeId,
  data,
}: {
  meetId: number;
  chargeId: number;
  data: { content: string; totalPrice: number; peopleNumber: number; memberIds: number[] };
}) => {
  await defaultAxios.patch(`/meets/${meetId}/charge/${chargeId}`, data);
};

// 정산 삭제
export const deleteBill = async ({ meetId, chargeId }: { meetId: number; chargeId: number }) => {
  await defaultAxios.delete(`/meets/${meetId}/charge/${chargeId}`);
};
