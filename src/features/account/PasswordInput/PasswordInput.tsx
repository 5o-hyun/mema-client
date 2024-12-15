'use client';
import styled from 'styled-components';
import React, { useState } from 'react';
import { UseInputStateReturn } from '@/lib/hooks/useInputState';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import ToggleVisibilityButton from '@/components/common/ToggleVisibilityButton';

type Props = {
  password: UseInputStateReturn;
};

const PasswordInput: React.FC<Props> = ({ password }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Container>
      <InputWrapper
        isFocused={password.isFocused}
        isEmpty={password.isEmpty}
        isError={password.isError}
      >
        <Label isFocused={password.isFocused} isEmpty={password.isEmpty} isError={password.isError}>
          비밀번호
        </Label>
        <Input
          type={isPasswordVisible ? 'text' : 'password'}
          value={password.value}
          placeholder="비밀번호를 입력하세요"
          onChange={password.handleChange}
          onFocus={password.handleFocus}
          onBlur={password.handleBlur}
          maxLength={12}
        />
        <ToggleVisibilityButton
          isVisible={isPasswordVisible}
          onClick={() => setIsPasswordVisible((prev) => !prev)}
        />
      </InputWrapper>
      {password.value && password.isError && (
        <ErrorMessage>비밀번호는 알파벳, 숫자 조합의 8~12자리로 입력해야 해요.</ErrorMessage>
      )}
    </Container>
  );
};

export default PasswordInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.red};
  ${({ theme }) => theme.fonts.text.md};
`;
