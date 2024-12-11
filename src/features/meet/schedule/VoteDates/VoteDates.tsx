'use client';
import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import TabBar from '@/components/TabBar';
import { formatDate } from '@/lib/utils/formatDate';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';

type VoteDatesProps = {
  type: 'create' | 'edit';
  onClickBack: () => void;
  onClickComplete: () => void;
  selectedDates: Date[];
  onChangeDates: (dates: Date[]) => void;
};

const VoteDates = ({
  type = 'create',
  onClickBack,
  onClickComplete,
  selectedDates,
  onChangeDates,
}: VoteDatesProps) => {
  return (
    <>
      <Container>
        <TabBar onClick={onClickBack} />
        <p className="title">
          만남이 가능한 날짜를
          <br />
          모두 선택해주세요!
        </p>

        <CustomCalendar
          mode="select"
          voteStartDay={new Date()}
          mySelectedDates={selectedDates}
          maxSelectableDate={60}
          onChangeSelected={(dates) => onChangeDates(dates)}
        />

        <StyledDiv>
          {selectedDates.length === 0 ? (
            <p className="grayish-desc">
              날짜를 선택하면 그 날에
              <br />
              누구와 만날 수 있는지 알 수 있어요!
            </p>
          ) : (
            <>
              <span className="emphasize-desc">
                {formatDate(selectedDates[selectedDates.length - 1], 'MM월 DD일')}
              </span>
              에 만날 수 있는 사람은
              <br />
              <span className="bold-desc">닉네임, 닉네임, 닉네임 이에요.</span>
            </>
          )}
        </StyledDiv>
        {type === 'create' ? (
          <StyledButton
            name="선택 완료!"
            onClick={onClickComplete}
            disabled={selectedDates.length === 0}
          />
        ) : (
          <StyledButton name="수정하기" onClick={onClickComplete} />
        )}
      </Container>
    </>
  );
};

export default VoteDates;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    ${({ theme }) => theme.fonts.title.md};
    margin: 20px 0 20px;
  }
`;

const StyledDiv = styled.div`
  padding: 12px 16px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  border-radius: 15px;
  color: black;
  ${({ theme }) => theme.fonts.text.xl};
  .grayish-desc {
    ${({ theme }) => theme.fonts.text.xl};
    color: ${({ theme }) => theme.colors.gray[2]};
  }
  .emphasize-desc {
    ${({ theme }) => theme.fonts.title.xs};
    color: ${({ theme }) => theme.colors.primary.default};
  }
  .bold-desc {
    ${({ theme }) => theme.fonts.title.xs};
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;
