'use client';
import styled from 'styled-components';
import React, { useState } from 'react';
import { UseInputStateReturn } from '@/hooks/useInputState';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import ToggleVisibilityButton from '@/components/common/ToggleVisibilityButton';
import Button from '@/components/Button';

type Props = {
  password: UseInputStateReturn;
};

const PasswordInput: React.FC<Props> = ({ password }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Container>
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
  );
};

export default PasswordInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
