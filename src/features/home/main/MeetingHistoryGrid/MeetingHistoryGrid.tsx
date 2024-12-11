import React from 'react';
import styled from 'styled-components';
import MemberIconStack from '@/features/home/main/MemberIconStack';
import { useRouter } from 'next/navigation';

const meetings = [
  {
    id: 1,
    title: '방어회중자모임',
    isActive: true,
    members: [
      { puzzleId: 1, puzzleColor: 'blue' },
      { puzzleId: 2, puzzleColor: 'red' },
      { puzzleId: 3, puzzleColor: 'yellow' },
    ],
  },
  {
    id: 3,
    title: '15학번이즈백',
    isActive: false,
    members: [
      { puzzleId: 4, puzzleColor: 'green' },
      { puzzleId: 5, puzzleColor: 'purple' },
      { puzzleId: 6, puzzleColor: 'black' },
    ],
  },
  {
    id: 4,
    title: '한강 치킨팟',
    isActive: false,
    members: [
      { puzzleId: 4, puzzleColor: 'green' },
      { puzzleId: 5, puzzleColor: 'purple' },
      { puzzleId: 6, puzzleColor: 'black' },
      { puzzleId: 7, puzzleColor: 'blue' },
      { puzzleId: 8, puzzleColor: 'red' },
      { puzzleId: 9, puzzleColor: 'yellow' },
      { puzzleId: 10, puzzleColor: 'green' },
      { puzzleId: 11, puzzleColor: 'purple' },
    ],
  },
];

const MeetingHistoryGrid = () => {
  const router = useRouter();
  return (
    <Container>
      <p className="title">곧 만나요!</p>
      <BlockContainer>
        {meetings
          .filter((meeting) => meeting.isActive)
          .slice(0, 4)
          .map((meeting) => (
            <MeetingBlock
              key={meeting.id}
              $isActive={meeting.isActive}
              onClick={() => {
                router.push(`/meet/${meeting.id}`);
              }}
            >
              <p className="title">{meeting.title}</p>
              <Row>
                <p className="description">인원 {meeting.members.length}명</p>
                <MemberIconStack members={meeting.members} />
              </Row>
            </MeetingBlock>
          ))}
      </BlockContainer>
      <p className="title">즐거웠어요!</p>
      <BlockContainer>
        {meetings
          .filter((meeting) => !meeting.isActive)
          .slice(0, 4)
          .map((meeting) => (
            <MeetingBlock
              key={meeting.id}
              $isActive={meeting.isActive}
              onClick={() => {
                router.push(`/meet/${meeting.id}`);
              }}
            >
              <p className="title">{meeting.title}</p>
              <Row>
                <p className="description">인원 {meeting.members.length}명</p>
                <MemberIconStack members={meeting.members} />
              </Row>
            </MeetingBlock>
          ))}
      </BlockContainer>
    </Container>
  );
};

export default MeetingHistoryGrid;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 150px;
  .title {
    ${({ theme }) => theme.fonts.title.sm};
    color: ${({ theme }) => theme.colors.gray[3]};
    margin-bottom: 10px;
  }
`;

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 0 40px;
`;

const MeetingBlock = styled.div<{ $isActive: boolean }>`
  border-radius: 15px;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.primary.lighter : theme.colors.gray[6]};
  padding: 16px;
  cursor: pointer;
  .title {
    ${({ theme }) => theme.fonts.title.xs};
    color: black;
  }
  .description {
    ${({ theme }) => theme.fonts.text.lg};
    color: ${({ theme, $isActive }) => ($isActive ? 'white' : theme.colors.gray[4])};
    margin-right: 10px;
    align-content: center;
  }
`;

const Row = styled.div`
  display: flex;
  align-content: center;
`;
