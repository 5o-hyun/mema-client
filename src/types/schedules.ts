import { CALENDAR_MODE, SCHEDULE_STATUS } from '@/constants/scheduleConst';

export type ScheduleStatus = (typeof SCHEDULE_STATUS)[keyof typeof SCHEDULE_STATUS];
export type CalendarMode = (typeof CALENDAR_MODE)[keyof typeof CALENDAR_MODE];

export type ScheduleMember = {
  meetMemberId: number; // 멤버 고유 ID
  meetMemberName: string; // 멤버 이름
};

export type VoteDate = {
  date: string; // 투표 날짜 (YYYY-MM-DD 형식)
  members: ScheduleMember[]; // 날짜에 투표한 멤버 목록
};

export type ScheduleResponse = {
  voteDates: VoteDate[]; // 투표 날짜 및 멤버 목록 배열
};

export type MyScheduleResponse = {
  meetMemberId: number; // 멤버 고유 ID
  meetMemberName: string; // 멤버 이름
  date: string[]; // 날짜 배열 (YYYY-MM-DD 형식)
};

export type CreateScheduleData = {
  expiredVoteDate?: string;
  meetMemberId: number;
  voteDates: string[];
};

export type UpdateScheduleData = {
  meetMemberId: number;
  voteDates: string[];
};
