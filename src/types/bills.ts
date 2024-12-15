// Bill total 조회. Bills[]와 같이 배열 형태로 사용해야 함.
export type Bills = {
  chargeId: number;
  content: string;
  totalPrice: number;
  peopleNumber: number;
  payeeNickname: string;
  members: {
    isMe: boolean;
    me: boolean;
    memberId: number;
    nickname: string;
  }[];
};

// Bill 단건 조회
export type Bill = {
  chargeId: number;
  content: string;
  totalPrice: number;
  peopleNumber: number;
  payeeNickname: string;
  members: {
    isMe: boolean;
    me: boolean;
    memberId: number;
    nickname: string;
  }[];
};
