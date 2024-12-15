'use client';
import styled from 'styled-components';
import React from 'react';
import Button from '@/components/Button';
import { UseInputStateReturn } from '@/lib/hooks/useInputState';
import InputWrapper from '@/components/Input/InputWrapper';
import Label from '@/components/common/Label';
import Input from '@/components/Input';

type AccountInputsProps = {
  nickname: UseInputStateReturn;
  onClickNext: () => void;
};

const NicknameInput: React.FC<AccountInputsProps> = ({ nickname, onClickNext }) => {
  return (
    <>
      <Container>
        <InputWrapper isFocused={nickname.isFocused} isEmpty={nickname.isEmpty}>
          <Label isFocused={nickname.isFocused} isEmpty={nickname.isEmpty}>
            닉네임
          </Label>
          <Input
            type="text"
            value={nickname.value}
            placeholder="닉네임을 입력하세요"
            onChange={nickname.handleChange}
            onFocus={nickname.handleFocus}
            onBlur={nickname.handleBlur}
          />
        </InputWrapper>
      </Container>
      <StyledButton name="다음으로" disabled={!nickname.value} onClick={onClickNext} />
    </>
  );
};

export default NicknameInput;

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
