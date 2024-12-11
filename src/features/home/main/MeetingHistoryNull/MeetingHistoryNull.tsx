import NullImage from '@/assets/icons/svg/null.svg';
import React from 'react';
import styled from 'styled-components';

const MeetingHistoryNull = () => {
  return (
    <Container>
      <NullImage />
      <p className="title">아직 미팅이 없어요!</p>
      <p className="description">
        즐겁고 간편한 모임을 위해
        <br />
        미팅을 만들어 관리해보세요!
      </p>
    </Container>
  );
};

export default MeetingHistoryNull;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 110px;
  text-align: center;
  svg {
    margin-bottom: 40px;
  }
  .title {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.gray[3]};
    ${({ theme }) => theme.fonts.text['xl']};
  }
  .description {
    color: ${({ theme }) => theme.colors.gray[4]};
    ${({ theme }) => theme.fonts.text['md']};
  }
`;
