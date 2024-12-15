'use client';
import TabBar from '@/components/TabBar';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import React from 'react';
import LoginForm from '@/components/LoginForm';
import { useInputState } from '@/lib/hooks/useInputState';
import Button from '@/components/Button';
import Logo from '/public/svgs/common/logo.svg';
import TitleWithDescription from '@/components/common/TitleWithDescription';
import { useMutation } from '@tanstack/react-query';
import { login } from '@/lib/api/account';
import { useUserRoleStore } from '@/store/userRoleStore';

const LoginPage = () => {
  const router = useRouter();
  const email = useInputState();
  const password = useInputState();
  const { setUserRole } = useUserRoleStore();

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      setUserRole('ROLE_CUSTOM');
      router.push('/');
    },
    onError: (error) => {
      console.error('Login failed:', error);
      alert('로그인 실패');
    },
  });

  const handleLogin = () => {
    if (!(email.value && password.value)) return;
    loginMutation.mutate({ email: email.value, password: password.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <>
      <TabBar onClickBack={() => router.push('/')} />
      <TitleWithDescription
        title={
          <>
            <MemaFontLogo fill="#238AFF" />
            에서 친구들과
            <br /> 더 쉬운 모임을 하고 싶다면?
          </>
        }
        description="회원 서비스 이용을 위해 로그인 해주세요!"
      />
      <form onSubmit={handleSubmit}>
        <LoginForm email={email} password={password} />
        <StyledButton name="로그인하기" type="submit" disabled={!(email.value && password.value)} />
      </form>
    </>
  );
};

export default LoginPage;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;

const MemaFontLogo = styled(Logo)`
  margin-right: 8px;
`;
