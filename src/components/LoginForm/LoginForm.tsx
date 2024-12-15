import React, { useState } from 'react';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import ToggleVisibilityButton from '@/components/common/ToggleVisibilityButton';
import styled from 'styled-components';
import { UseInputStateReturn } from '@/lib/hooks/useInputState';

type LoginFormProps = {
  email: UseInputStateReturn;
  password: UseInputStateReturn;
};

const LoginForm: React.FC<LoginFormProps> = ({ email, password }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <LoginContainer>
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
