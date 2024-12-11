import styled from 'styled-components';
import Button from '@/components/Button';

interface Props {
  type: 'inProgress' | 'needReVote' | 'needComplete' | 'complete';
  auth: 'host' | 'member';
}

const CalendarViewButtons = ({ type, auth }: Props) => {
  return (
    <Container>
      {(type === 'inProgress' || (type === 'needReVote' && auth === 'member')) && (
        <Button name="수정하기" />
      )}
      {type === 'needReVote' && auth === 'host' && (
        <>
          <Button name="재투표하기" buttonType="gray" />
          <Button name="수정하기" />
        </>
      )}
    </Container>
  );
};

export default CalendarViewButtons;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;
