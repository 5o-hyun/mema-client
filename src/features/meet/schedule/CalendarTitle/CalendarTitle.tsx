import { SCHEDULE_STATUS } from '@/constants/scheduleConst';
import React from 'react';
import { ScheduleStatus } from '@/types/schedules';
import styled from 'styled-components';
import { formatDate } from '@/lib/utils/dateUtils';

type Props = {
  status: ScheduleStatus;
  date?: Date;
  voted: boolean;
};

const CalendarTitle = ({ status, date, voted }: Props) => {
  return (
    <TextContainer>
      {status === SCHEDULE_STATUS.IN_PROGRESS && !voted && (
        <p className="title">
          만남이 가능한 날짜를
          <br />
          모두 선택해주세요!
        </p>
      )}
      {status === SCHEDULE_STATUS.IN_PROGRESS && voted && (
        <p className="title">
          다른 미팅원들이
          <br />
          투표중이에요
        </p>
      )}
      {status === SCHEDULE_STATUS.NEED_REVOTE && (
        <>
          <p className="title">모두가 가능한 날짜가 없어요</p>
          <p className="description">선택한 날짜를 수정하거나, 재투표를 할 수 있어요</p>
        </>
      )}
      {status === SCHEDULE_STATUS.NEED_COMPLETE && (
        <>
          <p className="title">만나는 날짜를 선택해야 해요.</p>
          <p className="description">하나의 날짜가 선택되어야 해요</p>
        </>
      )}
      {status === SCHEDULE_STATUS.COMPLETED && (
        <p className="title">{date && formatDate(date, 'MM월 DD일')}에 만나요!</p>
      )}
    </TextContainer>
  );
};

export default CalendarTitle;

const TextContainer = styled.div`
  margin: 20px 0 22px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .title {
    ${({ theme }) => theme.fonts.title.md};
  }
  .description {
    ${({ theme }) => theme.fonts.text.lg};
  }
`;
