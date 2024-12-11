'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import DateTimePicker from '@/components/DateTimePicker';
import Button from '@/components/Button';

type VoteDueDateProps = {
  onClickNext: () => void;
  date: Date;
  onChange: (date: Date) => void;
};

const VoteDueDate = ({ onClickNext, date, onChange }: VoteDueDateProps) => {
  return (
    <>
      <Container>
        <p className="title">언제까지 투표할까요?</p>
        <p className="description">날짜 투표 마감할 시간을 알려주세요</p>
        <DateTimePicker date={date} onChange={onChange} />
        <StyledButton name="다음으로" onClick={onClickNext} />
      </Container>
    </>
  );
};

export default VoteDueDate;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    ${({ theme }) => theme.fonts.title.md};
    margin: 50px 0 10px;
  }
  .description {
    ${({ theme }) => theme.fonts.text.lg};
    margin-bottom: 70px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;
