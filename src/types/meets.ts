export type Meet = {
  meetId: number; // 약속 고유 ID
  meetName: string; // 약속명
  meetState: string; // 약속 상태값
  meetDate: null | string; // 만남 날짜
  meetLocation: null | string; // 만남 장소
  voteExpiredDate: string; // 날짜 투표 만료일
  voteExpiredLocation: string; // 장소 투표 만료일
  members: {
    userId: number; // 유저 아이디
    nickname: string; // 닉네임
    puzzleId: number; // 프로필 퍼즐 아이디
    puzzleColor: string; // 프로필 퍼즐 색깔
    isMe: boolean; // 본인인지아닌지
  }[];
};
