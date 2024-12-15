'use client';
import styled from 'styled-components';
import React, { useState } from 'react';
import { UseInputStateReturn } from '@/lib/hooks/useInputState';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import ToggleVisibilityButton from '@/components/common/ToggleVisibilityButton';
import Button from '@/components/Button';

type AccountInputsProps = {
  onClickNext: () => void;
  email: UseInputStateReturn;
  password: UseInputStateReturn;
  verificationCode: UseInputStateReturn;
};

const AccountInputs: React.FC<AccountInputsProps> = ({
  onClickNext,
  email,
  password,
  verificationCode,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isVerify, setIsVerify] = useState(false);

  const handleRequestVerification = () => {
    console.log('이메일 인증 요청 보내기');
  };

  const handleVerifyCode = () => {
    console.log('인증 코드 검증');
    setIsVerify(!isVerify);
  };

  return (
    <>
      <Container>
        <InputWrapper isFocused={email.isFocused} isEmpty={email.isEmpty}>
          <Label isFocused={email.isFocused} isEmpty={email.isEmpty}>
            이메일
          </Label>
          <Input
            type="email"
            value={email.value}
            placeholder="이메일을 입력하세요"
            onChange={email.handleChange}
            onFocus={email.handleFocus}
            onBlur={email.handleBlur}
          />
          <VerificationButton onClick={handleRequestVerification}>인증 요청</VerificationButton>
        </InputWrapper>
        <InputWrapper isFocused={verificationCode.isFocused} isEmpty={verificationCode.isEmpty}>
          <Label isFocused={verificationCode.isFocused} isEmpty={verificationCode.isEmpty}>
            인증 번호
          </Label>
          <Input
            type="text"
            value={verificationCode.value}
            placeholder="인증번호를 입력하세요"
            onChange={verificationCode.handleChange}
            onFocus={verificationCode.handleFocus}
            onBlur={verificationCode.handleBlur}
          />
          <VerificationButton disabled={isVerify} onClick={handleVerifyCode}>
            {isVerify ? '인증 완료' : '확인'}
          </VerificationButton>
        </InputWrapper>
        <InputWrapper isFocused={password.isFocused} isEmpty={password.isEmpty}>
          <Label isFocused={password.isFocused} isEmpty={password.isEmpty}>
            비밀번호
          </Label>
          <Input
            type={isPasswordVisible ? 'text' : 'password'}
            value={password.value}
            placeholder="비밀번호를 입력하세요"
            onChange={password.handleChange}
            onFocus={password.handleFocus}
            onBlur={password.handleBlur}
          />
          <ToggleVisibilityButton
            isVisible={isPasswordVisible}
            onClick={() => setIsPasswordVisible((prev) => !prev)}
          />
        </InputWrapper>
      </Container>
      <StyledButton name="다음으로" disabled={!isVerify} onClick={onClickNext} />
    </>
  );
};

export default AccountInputs;

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

const VerificationButton = styled.button`
  ${({ theme }) => theme.fonts.text.sm};
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.colors.gray[4]};
  color: ${({ theme }) => theme.colors.gray[4]};
  background-color: white;
  padding: 4px 10px;
  &:disabled {
    border: none;
    background-color: ${({ theme }) => theme.colors.primary.default};
    color: white;
  }
`;
