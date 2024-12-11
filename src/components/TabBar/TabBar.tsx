'use client';
import React from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'react-feather';
import { useRouter } from 'next/navigation';
import Logo from '/public/svgs/common/logo.svg';
import { ExternalLink, Settings } from 'react-feather';
import Link from 'next/link';

type Props = {
  leftType?: 'logo' | 'backBtn';
  rightType?: 'shareBtn' | 'settingBtn';
  onClick?: () => void;
  onClickBack?: () => void;
};

function TabBar({ leftType = 'backBtn', rightType, onClick, onClickBack }: Props) {
  const router = useRouter();
  const handleBack = onClickBack || (() => router.back());

  return (
    <Container>
      {leftType === 'logo' ? (
        <Link href={'/'}>
          <Logo fill="#E0E0E0" />
        </Link>
      ) : (
        <ChevronLeft onClick={handleBack} />
      )}
      {rightType === 'shareBtn' && <ExternalLink onClick={onClick} />}
      {rightType === 'settingBtn' && <SettingsIcon onClick={onClick} />}
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

const SettingsIcon = styled(Settings)`
  stroke: ${({ theme }) => theme.colors.gray[4]};
`;

export default TabBar;
