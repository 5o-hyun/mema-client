'use client';
import React from 'react';
import MainLogo from '@/assets/icons/svg/puzzleLogo.svg';
import Logo from '/public/svgs/common/logo.svg';
import styled from 'styled-components';

const WelcomeHeader = () => {
  return (
    <>
      <MainLogo />
      <TextOveray>
        <p className="title">
          안녕하세요 <Logo fill="#238AFF" /> 입니다!
        </p>
        <p className="description">
          메마에서 모임을 더 쉽게!
          <br />
          로그인하고 다양한 기능을 사용해보세요
        </p>
      </TextOveray>
    </>
  );
};

export default WelcomeHeader;

const TextOveray = styled.div`
  position: absolute;
  transform: translateY(-50%);
  width: calc(100% - 32px);
  text-align: center;
  .title {
    ${({ theme }) => theme.fonts.title.lg}
  }
  .description {
    margin: 20px 0 0;
    ${({ theme }) => theme.fonts.text.lg}
  }
`;
