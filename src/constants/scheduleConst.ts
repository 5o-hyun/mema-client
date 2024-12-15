export const SCHEDULE_STATUS = {
  /** 일정 선택 진행 중 */
  IN_PROGRESS: 'IN_PROGRESS',
  /** 참여자 모두가 가능한 날짜가 없어 재투표/수정 필요 */
  NEED_REVOTE: 'NEED_REVOTE',
  /** 참여자 모두가 가능한 날이 있어서 날짜 확정 필요 */
  NEED_COMPLETE: 'NEED_COMPLETE',
  /** 날짜 확정 완료 */
  COMPLETED: 'COMPLETED',
} as const;

export const MAX_SCHEDULE_SELECTABLE_DATE = 60;

export const CALENDAR_MODE = {
  /** 다중 선택 모드 */
  SELECT_MULTI: 'SELECT_MULTI',
  /** 단일 선택 모드 */
  SELECT_ONE: 'SELECT_ONE',
  /** 조회 */
  VIEW: 'VIEW',
} as const;
