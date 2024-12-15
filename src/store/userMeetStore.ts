import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ScheduleStatus } from '@/types/schedules';

type MeetState = {
  meetMemberMap: Record<number, number>; // 미팅별 멤버 ID
  meetScheduleStatusMap: Record<number, ScheduleStatus>; // 미팅별 일정 투표 상태

  setMeetMemberId: (meetId: number, meetMemberId: number) => void;
  getMeetMemberId: (meetId: number) => number | null;

  setMeetScheduleStatus: (meetId: number, status: ScheduleStatus) => void;
  getMeetScheduleStatus: (meetId: number) => ScheduleStatus | null;
};

export const userMeetStore = create<MeetState>()(
  persist(
    (set, get) => ({
      meetMemberMap: {},
      meetScheduleStatusMap: {},

      setMeetMemberId: (meetId, meetMemberId) =>
        set((state) => ({
          meetMemberMap: { ...state.meetMemberMap, [meetId]: meetMemberId },
        })),

      getMeetMemberId: (meetId) => get().meetMemberMap[meetId] || null,

      setMeetScheduleStatus: (meetId, status) =>
        set((state) => ({
          meetScheduleStatusMap: { ...state.meetScheduleStatusMap, [meetId]: status },
        })),

      getMeetScheduleStatus: (meetId) => get().meetScheduleStatusMap[meetId] || null,
    }),
    {
      name: 'meet-store',
      partialize: (state) => ({
        meetMemberMap: state.meetMemberMap,
        meetScheduleStatusMap: state.meetScheduleStatusMap,
      }),
    },
  ),
);
