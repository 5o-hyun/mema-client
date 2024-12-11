'use client';
import styled from 'styled-components';
import React from 'react';
import Button from '@/components/Button';
import { UseInputStateReturn } from '@/hooks/useInputState';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';

type JoinCodeInputProps = {
  joinCode: UseInputStateReturn;
};

const JoinCodeInput: React.FC<JoinCodeInputProps> = ({ joinCode }) => {
  return (
    <>
      <Container>
        <InputWrapper isFocused={joinCode.isFocused} isEmpty={joinCode.isEmpty}>
          <Input
            type="text"
            value={joinCode.value}
            placeholder="참여 코드를 입력해주세요"
            onChange={joinCode.handleChange}
            onFocus={joinCode.handleFocus}
            onBlur={joinCode.handleBlur}
          />
        </InputWrapper>
      </Container>
    </>
  );
};

export default JoinCodeInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
