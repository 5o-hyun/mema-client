export const mockMeetData = {
  meetId: 1, // 약속 고유 ID
  meetName: '찜닭먹는 모임', // 약속명
  meetState: 'READY_DATE_VOTE', // 약속 상태값
  meetDate: null, // 만남 날짜
  meetLocation: null, // 만남 장소
  voteExpiredDate: '2024-12-03T10:15:30', // 날짜 투표 만료일
  voteExpiredLocation: '2024-12-03T10:15:30', // 장소 투표 만료일
  members: [
    // 약속원들 프로필 정보
    {
      userId: 1, // 유저 아이디
      nickname: '토끼', // 닉네임
      puzzleId: 1, // 프로필 퍼즐 아이디
      puzzleColor: 'red', // 프로필 퍼즐 색깔
      isMe: true,
    },
    {
      userId: 2,
      nickname: '호랑이',
      puzzleId: 5,
      puzzleColor: 'blue',
      isMe: false,
    },
  ],
};
