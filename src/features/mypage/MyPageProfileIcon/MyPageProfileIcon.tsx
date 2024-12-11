'use client';
import styled from 'styled-components';
import React from 'react';
import MemberIcon from '@/components/common/MemberIcon';

type Props = {
  puzzleId: number;
  puzzleColor: string;
};

const MyPageProfileIcon = ({ puzzleId, puzzleColor }: Props) => {
  return (
    <Container>
      <MemberIcon puzzleId={puzzleId} puzzleColor={puzzleColor} size={150} />
    </Container>
  );
};

export default MyPageProfileIcon;

const Container = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.colors.gray[5]};
  flex-shrink: 0;
  margin: 20px 0;
`;
