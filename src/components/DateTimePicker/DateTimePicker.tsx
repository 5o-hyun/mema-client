import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Picker from '@/components/Picker';

interface DateTimePickerProps {
  date: Date;
  onChange: (newDate: Date) => void;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ date, onChange }) => {
  const dateRef = useRef(new Date(date));
  const [month, setMonth] = useState(date.getMonth() + 1);
  const [day, setDay] = useState(date.getDate());
  const [monthDays, setMonthDays] = useState<number[]>(Array.from({ length: 30 }, (_, i) => i + 1));

  const updateDateAndTriggerChange = useCallback(() => {
    const updatedDate = new Date(dateRef.current);
    updatedDate.setSeconds(0, 0);
    onChange(updatedDate);
  }, [onChange, dateRef]);

  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    dateRef.current.setMonth(newMonth - 1);
    updateDateAndTriggerChange();
  };

  const handleDayChange = (newDay: number) => {
    setDay(newDay);
    dateRef.current.setDate(newDay);
    updateDateAndTriggerChange();
  };

  const handleHourChange = (newHour: number) => {
    dateRef.current.setHours(newHour);
    updateDateAndTriggerChange();
  };

  const handleMinuteChange = (newMinute: string) => {
    const numericMinute = Number(newMinute);
    dateRef.current.setMinutes(numericMinute);
    updateDateAndTriggerChange();
  };

  useEffect(() => {
    const daysInMonth = new Date(date.getFullYear(), month, 0).getDate();
    setMonthDays(Array.from({ length: daysInMonth }, (_, i) => i + 1));

    if (day > daysInMonth) {
      setDay(daysInMonth);
      dateRef.current.setDate(daysInMonth);
      updateDateAndTriggerChange();
    }
  }, [month, date, day, updateDateAndTriggerChange]);

  return (
    <Container>
      <PickerWrapper>
        <Picker<number>
          values={Array.from({ length: 12 }, (_, i) => i + 1)}
          selectedValue={month}
          onSelectedChange={handleMonthChange}
        />
      </PickerWrapper>
      <Label>월</Label>
      <PickerWrapper>
        {monthDays.length > 0 && (
          <Picker<number>
            values={monthDays}
            selectedValue={day}
            onSelectedChange={handleDayChange}
          />
        )}
      </PickerWrapper>
      <DayLabel>일</DayLabel>

      <PickerWrapper>
        <Picker<number>
          values={Array.from({ length: 24 }, (_, i) => i)}
          onSelectedChange={handleHourChange}
        />
      </PickerWrapper>
      <Label>:</Label>

      <PickerWrapper>
        <Picker<string>
          values={Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, '0'))}
          onSelectedChange={handleMinuteChange}
        />
      </PickerWrapper>
    </Container>
  );
};

export default DateTimePicker;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  padding: 16px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
`;

const Label = styled.span`
  ${({ theme }) => theme.fonts.title.md};
`;

const DayLabel = styled(Label)`
  margin-right: 17px;
`;

const PickerWrapper = styled.div`
  width: 50px;
  flex-shrink: 0;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
`;
