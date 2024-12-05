import React, { useState } from 'react';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import ToggleVisibilityButton from '@/components/common/ToggleVisibilityButton';
import { useInputState } from '@/hooks/useInputState';
import styled from 'styled-components';

const LoginForm: React.FC = () => {
  const username = useInputState();
  const password = useInputState();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <LoginContainer>
      <InputWrapper isFocused={username.isFocused} isEmpty={username.isEmpty}>
        <Label isFocused={username.isFocused} isEmpty={username.isEmpty}>
          아이디
        </Label>
        <Input
          type="text"
          value={username.value}
          placeholder="아이디를 입력하세요"
          onChange={username.handleChange}
          onFocus={username.handleFocus}
          onBlur={username.handleBlur}
        />
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
    </LoginContainer>
  );
};

export default LoginForm;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
