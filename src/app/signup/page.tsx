'use client';
import Logo from '/public/svgs/common/logo.svg';
import React, { useState } from 'react';
import { useInputState } from '@/hooks/useInputState';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import useToggle from '@/lib/hooks/useToggle';
import NicknameInput from '@/features/account/signup/NicknameInput';
import TabBar from '@/components/TabBar';
import { Text } from '@/components/Modal/modalTypography';
import TitleWithDescription from '@/components/common/TitleWithDescription';
import EmailVerificationInputs from '@/features/account/EmailVerificationInputs';
import styled from 'styled-components';
import Button from '@/components/Button';
import PasswordInput from '@/features/account/PasswordInput';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/lib/api/account';

const SignupPage = () => {
  const router = useRouter();
  const nickname = useInputState();
  const email = useInputState();
  const password = useInputState();
  const verificationCode = useInputState();

  const [currentStep, setCurrentStep] = useState(0);
  const [isOpenModal, toggleOpenModal] = useToggle();

  const next = () => {
    setCurrentStep((prev) => ++prev);
  };

  const [isVerified, setVerification] = useState(false);
  const handleRequestVerification = () => {
    console.log('이메일 인증 요청 보내기');
    setVerification(!isVerified);
  };

  const handleVerifyCode = () => {
    console.log('인증 코드 검증');
    setVerification(!isVerified);
  };

  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toggleOpenModal();
    },
    onError: (error) => {
      console.error('Signup failed:', error);
      alert('회원가입 실패');
    },
  });

  const handleSignup = () => {
    if (!(email.value && password.value && nickname.value)) return;
    signupMutation.mutate({
      email: email.value,
      password: password.value,
      nickname: nickname.value,
    });
  };

  const steps = [
    {
      id: 1,
      content: (
        <>
          <Container>
            <EmailVerificationInputs
              onClickRequestVerification={handleRequestVerification}
              onClickVerifyCode={handleVerifyCode}
              email={email}
              verificationCode={verificationCode}
              isVerified={isVerified}
            />
            <PasswordInput password={password} />
          </Container>
          <StyledButton name="다음으로" disabled={!isVerified} onClick={next} />
        </>
      ),
      description: '서비스를 이용하실 이메일과 비밀번호를 알려주세요!',
    },
    {
      id: 2,
      content: <NicknameInput nickname={nickname} onClickNext={handleSignup} />,
      description: '메마에서 사용하실 닉네임을 알려주세요!',
    },
  ];
  return (
    <>
      <TabBar />
      <TitleWithDescription
        title={
          <>
            어서오세요!
            <br />
            <Logo fill="#238AFF" /> 가 처음이신가요?
          </>
        }
        description={steps[currentStep].description}
      />
      {steps[currentStep].content}
      {isOpenModal && (
        <Modal
          type="Ok"
          okButtonName="로그인하기"
          onOk={() => {
            router.push('/login');
          }}
          width={326}
        >
          <Text>메마에 온 것을 환영합니다!</Text>
        </Modal>
      )}
    </>
  );
};

export default SignupPage;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
