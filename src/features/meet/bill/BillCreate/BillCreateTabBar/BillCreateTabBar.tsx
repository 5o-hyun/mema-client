'use client';
import React from 'react';
import { ChevronLeft } from 'react-feather';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

const BillCreateTabBar = ({ onClick }: Props) => {
  return (
    <Container>
      <ChevronLeft onClick={onClick} />
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;

export default BillCreateTabBar;
