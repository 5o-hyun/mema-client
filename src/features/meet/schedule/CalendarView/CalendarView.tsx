'use client';
import React from 'react';
import styled from 'styled-components';
import Button from '@/components/Button';
import TabBar from '@/components/TabBar';
import { formatDate } from '@/lib/utils/formatDate';
import { useRouter } from 'next/navigation';
import CustomCalendar from '@/components/CustomCalendar/CustomCalendar';

type MemberAuthorization = 'member' | 'host';

type VoteDatesProps = {
  type: 'inProgress' | 'needReVote' | 'needComplete' | 'complete';
  auth: MemberAuthorization;
  onClickBack: () => void;
  onClickConfirmDate: () => void;
  selectedDates: Date[];
  onChangeDate: (dates: Date) => void;
  clickedDate: Date | null;
};

const CalendarView = ({
  type = 'inProgress',
  auth = 'member',
  onClickBack,
  onClickConfirmDate,
  selectedDates,
  onChangeDate,
  clickedDate,
}: VoteDatesProps) => {
  const router = useRouter();
  return (
    <>
      <Container>
        <TabBar onClick={onClickBack} />
        <TextContainer>
          {type === 'inProgress' && (
            <p className="title">
              다른 미팅원들이
              <br />
              투표중이에요
            </p>
          )}
          {type === 'needReVote' && auth === 'host' && (
            <>
              <p className="title">모두가 가능한 날짜가 없어요</p>
              <p className="description">미팅장이 날짜를 선택하거나, 재투표를 할 수 있어요</p>
            </>
          )}
          {type === 'needReVote' && auth === 'member' && (
            <>
              <p className="title">미팅장이 만나는 날짜를 선택해야 해요</p>
              <p className="description">미팅장이 날짜를 선택하거나, 재투표를 할 수 있어요</p>
            </>
          )}
          {type === 'needComplete' && auth === 'host' && (
            <>
              <p className="title">만나는 날짜를 선택해야 해요.</p>
              <p className="description">미팅장이 날짜를 선택하거나, 재투표를 할 수 있어요</p>
            </>
          )}
          {type === 'complete' && <p className="title">11월 29일에 만나요!</p>}
        </TextContainer>

        {((type === 'needReVote' && auth === 'member') || type === 'inProgress') && (
          <CustomCalendar
            mode="view"
            voteStartDay={new Date()}
            allSelectedDates={selectedDates}
            mySelectedDates={[selectedDates[1]]}
            maxSelectableDate={60}
            onClick={(date) => onChangeDate(date)}
            clickedDate={clickedDate}
          />
        )}
        {type === 'needReVote' && auth === 'host' && (
          <CustomCalendar
            mode="complete"
            voteStartDay={new Date()}
            allSelectedDates={selectedDates}
            mySelectedDates={[selectedDates[1]]}
            maxSelectableDate={60}
            onClick={(date) => onChangeDate(date)}
            clickedDate={clickedDate}
          />
        )}
        {type === 'complete' && (
          <CustomCalendar
            mode="result"
            voteStartDay={new Date()}
            allSelectedDates={selectedDates}
            mySelectedDates={[selectedDates[1]]}
            maxSelectableDate={60}
            onClick={(date) => onChangeDate(date)}
            clickedDate={clickedDate}
          />
        )}

        <StyledDiv>
          {clickedDate ? (
            <>
              <span className="emphasize-desc">{formatDate(clickedDate, 'MM월 DD일')}</span>
              에 만날 수 있는 사람은
              <br />
              <span className="bold-desc">닉네임, 닉네임, 닉네임 이에요.</span>
            </>
          ) : (
            <p className="grayish-desc">
              날짜를 선택하면 그 날에
              <br />
              누구와 만날 수 있는지 알 수 있어요!
            </p>
          )}
        </StyledDiv>
        {/*<>*/}
        {/*  <span className="emphasize-desc">{formatDate(clickedDate, "MM월 DD일")}</span>*/}
        {/*  에 만날 수 있는 사람은 아직 없어요.*/}
        {/*</>*/}
        {type === 'inProgress' && (
          <ButtonContainer>
            <Button
              name="재투표하기"
              buttonType="gray"
              onClick={() => {
                router.push('/meet/1/schedule/edit');
              }}
              disabled={selectedDates.length === 0}
            />
            <Button
              name="날짜 고르기"
              onClick={onClickConfirmDate}
              disabled={selectedDates.length === 0} // Todo: 조건은 !(미팅원 모두 입력 완료 && 투표 마감)
            />
          </ButtonContainer>
        )}
      </Container>
    </>
  );
};

export default CalendarView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

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

const StyledDiv = styled.div`
  padding: 12px 16px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  border-radius: 15px;
  color: black;
  ${({ theme }) => theme.fonts.text.xl};
  .grayish-desc {
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

const ButtonContainer = styled.div`
  position: absolute;
  display: flex;
  bottom: 34px;
  width: calc(100% - 32px);
  gap: 8px;
`;
