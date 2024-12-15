'use client';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { ChevronRight } from 'react-feather';
import React from 'react';

type Props = {
  nickname: string;
};

const NicknameButton = ({ nickname }: Props) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push('/mypage/edit')}>
      {nickname}
      <ChevronRight />
    </Container>
  );
};

export default NicknameButton;

const Container = styled.div`
  ${({ theme }) => theme.fonts.title.lg};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
`;
