'use client';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { formatDate } from '@/lib/utils/formatDate';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'react-feather';

interface CalendarProps {
  startDay?: Date;
  selectedDates: Date[];
  onChangeSelected: (selectedDates: Date[]) => void;
  maxSelectableDate: number;
}

const MultiSelectCalendar: React.FC<CalendarProps> = ({
  startDay = new Date(),
  selectedDates,
  onChangeSelected,
  maxSelectableDate = 60,
}) => {
  const MIN_DATE = new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate() + 1);
  const MAX_DATE = new Date(
    MIN_DATE.getFullYear(),
    MIN_DATE.getMonth(),
    MIN_DATE.getDate() + maxSelectableDate - 1,
  );

  const [calendarDate, setCalendarDate] = useState<Date>(MIN_DATE);

  const isPrevDisabled =
    calendarDate.getFullYear() === MIN_DATE.getFullYear() &&
    calendarDate.getMonth() === MIN_DATE.getMonth();
  const isNextDisabled =
    calendarDate.getFullYear() === MAX_DATE.getFullYear() &&
    calendarDate.getMonth() === MAX_DATE.getMonth();

  const handleActiveStartDateChange = ({ activeStartDate }: { activeStartDate: Date | null }) => {
    if (!activeStartDate) return;
    setCalendarDate(activeStartDate);
  };

  const handleDateClick = (clickedDate: Date) => {
    // clickedDate가 이미 선택된 날짜인지 확인
    const isAlreadySelected = selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === clickedDate.toDateString(),
    );

    const newDates = isAlreadySelected
      ? selectedDates.filter(
          (selectedDate) => selectedDate.toDateString() !== clickedDate.toDateString(),
        )
      : [...selectedDates, clickedDate];

    // 업데이트된 날짜 리스트를 부모 컴포넌트에 전달
    onChangeSelected(newDates);
  };

  const isSelectedDate = (date: Date) => {
    return selectedDates.some(
      (selectedDate) => selectedDate.toDateString() === date.toDateString(),
    );
  };

  return (
    <StyledCalendarWrapper>
      <Calendar
        value={calendarDate}
        calendarType="iso8601"
        locale="en-US"
        formatDay={(locale, date) => formatDate(date, 'DD')}
        formatMonthYear={(locale, date) => date.toLocaleDateString('en-US', { month: 'long' })}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        prevLabel={<StyledChevronLeft disabled={isPrevDisabled} />}
        nextLabel={<StyledChevronRight disabled={isNextDisabled} />}
        onActiveStartDateChange={handleActiveStartDateChange}
        minDate={MIN_DATE}
        maxDate={MAX_DATE}
        onClickDay={handleDateClick}
        tileClassName={({ date }) => (isSelectedDate(date) ? 'selected' : '')}
      />
    </StyledCalendarWrapper>
  );
};

export default MultiSelectCalendar;

const StyledCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* Calendar 전체 영역 */
  .react-calendar {
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
