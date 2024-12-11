'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatDate } from '@/lib/utils/formatDate';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';

type CalendarMode = 'select' | 'view' | 'complete' | 'result';
// select : 다중 선택 가능한 모드
// view : 입력 현황 - 최종 날짜 선택 불가능
// complete : 입력 현황 - 최종 날짜 선택 가능 (for only host)
// result : 최종 날짜 선택 결과

interface CustomCalendarProps {
  mode: CalendarMode;
  voteStartDay: Date;
  onClick?: (date: Date) => void;
  onChangeSelected?: (dates: Date[]) => void;
  maxSelectableDate?: number;
  allSelectedDates?: Date[];
  mySelectedDates?: Date[];
  clickedDate?: Date | null;
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  mode,
  voteStartDay,
  onClick,
  onChangeSelected,
  maxSelectableDate = 60,
  allSelectedDates = [],
  mySelectedDates = [],
  clickedDate = null,
}) => {
  console.log('allSelectedDates : ', allSelectedDates);
  console.log('mySelectedDates : ', mySelectedDates);
  const MIN_DATE = new Date(
    voteStartDay.getFullYear(),
    voteStartDay.getMonth(),
    voteStartDay.getDate() + 1,
  );
  const MAX_DATE = new Date(
    MIN_DATE.getFullYear(),
    MIN_DATE.getMonth(),
    MIN_DATE.getDate() + maxSelectableDate - 1,
  );

  const [firstDayOfMonth, setFirstDayOfMonth] = useState<Date>(
    new Date(voteStartDay.getFullYear(), voteStartDay.getMonth(), 1),
  );

  const isPrevMonthDisabled =
    firstDayOfMonth.getFullYear() === MIN_DATE.getFullYear() &&
    firstDayOfMonth.getMonth() === MIN_DATE.getMonth();
  const isNextMonthDisabled =
    firstDayOfMonth.getFullYear() === MAX_DATE.getFullYear() &&
    firstDayOfMonth.getMonth() === MAX_DATE.getMonth();

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (!activeStartDate) return;
    setFirstDayOfMonth(activeStartDate);
  };

  const handleDateClick = (clickedDate: Date) => {
    if (mode === 'select' && onChangeSelected) {
      const isAlreadySelected = checkIfDateSelected(clickedDate);

      // 클릭한 날짜가 선택된 날짜이면 선택 해제
      const newSelectedDates = isAlreadySelected
        ? mySelectedDates.filter(
            (selectedDate) => selectedDate.toDateString() !== clickedDate.toDateString(),
          )
        : [...mySelectedDates, clickedDate];

      onChangeSelected(newSelectedDates);
    }
    if (onClick) {
      onClick(clickedDate);
    }
  };

  const checkIfDateSelected = (date: Date) => {
    return mySelectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString(),
    );
  };

  const checkIfDateSelectedByOthers = (date: Date) => {
    return allSelectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString(),
    );
  };

  return (
    <StyledCalendarWrapper>
      <Calendar
        value={firstDayOfMonth}
        calendarType="iso8601"
        locale="en-US"
        formatDay={(_, date) => formatDate(date, 'DD')}
        formatMonthYear={(_, date) =>
          date.toLocaleDateString('en-US', { month: 'long' }).toLowerCase()
        }
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        prevLabel={<StyledChevronLeft disabled={isPrevMonthDisabled} />}
        nextLabel={<StyledChevronRight disabled={isNextMonthDisabled} />}
        onActiveStartDateChange={handleActiveStartDateChange}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        onClickDay={handleDateClick}
        tileClassName={({ date }) => {
          if (mode === 'select' || mode === 'view') {
            if (checkIfDateSelectedByOthers(date)) return 'grayish-selected';
            if (checkIfDateSelected(date)) return 'selected';
          } else if (mode === 'complete') {
            if (date.toDateString() === clickedDate?.toDateString()) return 'greenish-selected';
            if (checkIfDateSelected(date)) return 'selected';
            if (checkIfDateSelectedByOthers(date)) return 'grayish-selected';
          } else if (mode === 'result') {
            if (checkIfDateSelected(date)) return 'selected';
            if (checkIfDateSelectedByOthers(date)) return 'grayish-selected';
          }
          return '';
        }}
      />
    </StyledCalendarWrapper>
  );
};

export default CustomCalendar;

const StyledCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  /* Calendar 전체 영역 */
  .react-calendar {
    width: 100%;
    border: none;
    padding: 11px 11px;
    background-color: ${({ theme }) => theme.colors.gray[6]};
    border-radius: 15px;
  }

  /* 헤더 영역 */
  .react-calendar__navigation {
    display: flex;
    justify-content: space-between;
    padding-top: 5px;
    margin-bottom: 15px;
    padding-left: 50px;
    padding-right: 50px;

    .react-calendar__navigation__label {
      pointer-events: none;
    }
    .react-calendar__navigation__arrow {
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: all;
      &:hover,
      &:active,
      &:focus {
        background-color: transparent; /* 포커스 시 배경색 제거 */
      }
    }
  }

  .react-calendar__navigation button {
    ${({ theme }) => theme.fonts.title.md};
    color: black;
    background: none;
    border: none;
    cursor: default;
  }

  /* 요일 영역 */
  .react-calendar__month-view__weekdays {
    ${({ theme }) => theme.fonts.text.md};
    color: ${({ theme }) => theme.colors.gray[3]};
    text-transform: uppercase;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none; /* 요일의 점선 밑줄 제거 */
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 8px 0;
    text-align: center;
  }

  /* 날짜 영역 */
  .react-calendar__month-view__days__day {
    ${({ theme }) => theme.fonts.text.xl};
    color: black;
    text-align: center;
    width: 48px;
    height: 48px;
    border-radius: 10px;
    cursor: pointer;
    background-color: white;

    &:hover {
      background-color: #007bff;
      color: #fff;
    }

    &--neighboringMonth {
      color: #bbb;
    }

    &--active {
      background-color: #007bff;
      color: white;
    }
  }

  .react-calendar__tile {
    transition:
      background-color 0.2s ease,
      color 0.2s ease;

    &:disabled {
      color: ${({ theme }) => theme.colors.gray[4]};
      cursor: not-allowed;
    }
  }

  /* 기존 hover, focus 시 디자인 덮어쓰기용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: white;
    color: black;
  }

  /* 선택된 항목 */
  .react-calendar__tile.selected {
    background-color: ${({ theme }) => theme.colors.primary.default} !important;
    color: white !important;
    border-radius: 10px;
  }

  .react-calendar__tile.grayish-selected {
    background-color: ${({ theme }) => theme.colors.gray[5]} !important;
    color: black !important;
    border-radius: 10px;
  }

  .react-calendar__tile.greenish-selected {
    background-color: ${({ theme }) => theme.colors.green} !important;
    color: white !important;
    border-radius: 10px;
  }

  /* 오늘 날짜 */
  .react-calendar__tile--now {
    outline: 2px solid ${({ theme }) => theme.colors.primary.default};
    outline-offset: -8px;
    color: black !important;
    &:hover {
      background-color: white;
    }
  }
`;

const StyledChevronLeft = styled(ChevronLeft)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.35 : 0.8)};
  }
`;

const StyledChevronRight = styled(ChevronRight)<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: ${({ disabled }) => (disabled ? 0.35 : 0.8)};
  }
`;
