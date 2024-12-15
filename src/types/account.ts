export type Account = {
  nickname: string;
  puzzleId: number;
  puzzleColor: 'blue' | 'red' | 'yellow' | 'green' | 'purple' | 'black';
  role: 'ROLE_CUSTOM' | 'ROLE_NAVER';
  visitCount: number;
  meetCount: number;
  badgeCount: number;
};
