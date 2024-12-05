'use client';
import React from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'react-feather';
import { useRouter } from 'next/navigation';
import Logo from '/public/svgs/common/logo.svg';
import { ExternalLink } from 'react-feather';
import Link from 'next/link';

type Props = {
  leftType?: 'logo' | 'backBtn';
  rightType?: 'shareBtn';
  onClick?: () => void;
};

function TabBar({ leftType = 'backBtn', rightType, onClick }: Props) {
  const router = useRouter();

  return (
    <Container>
      {leftType === 'logo' ? (
        <Link href={'/'}>
          <Logo />
        </Link>
      ) : (
        <ChevronLeft onClick={() => router.back()} />
      )}
      {rightType === 'shareBtn' && <ExternalLink onClick={onClick} />}
    </Container>
  );
}

const Container = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;

export default TabBar;
