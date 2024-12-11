import React from 'react';
import styled from 'styled-components';
import NullImage from '@/assets/icons/svg/null.svg';

const BillNull = () => {
  return (
    <Container>
      <NullImage />
      <p className="title">아직 내역이 없어요!</p>
      <p className="description">
        즐거운 모임 이후의
        <br />
        정산 내역을 공유해보세요!
      </p>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 227px;
  svg {
    margin-bottom: 40px;
  }
  .title {
    margin-bottom: 10px;
    color: ${({ theme }) => theme.colors.gray[3]};
    ${({ theme }) => theme.fonts.text['xl']};
  }
  .description {
    text-align: center;
    color: ${({ theme }) => theme.colors.gray[4]};
    ${({ theme }) => theme.fonts.text['md']};
  }
`;

export default BillNull;
