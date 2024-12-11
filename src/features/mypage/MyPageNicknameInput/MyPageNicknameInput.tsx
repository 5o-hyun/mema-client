import InputWrapper from '@/components/Input/InputWrapper';
import Input from '@/components/Input';
import React from 'react';
import styled from 'styled-components';
import { UseInputStateReturn } from '@/hooks/useInputState';
import GrayBoxContainer from '@/features/mypage/GrayBoxContainer';

type Props = {
  nickname: UseInputStateReturn;
  onBlur?: () => void;
};

const MyPageNicknameInput = ({ nickname, onBlur }: Props) => {
  return (
    <Container>
      <p className="title">닉네임</p>
      <InputWrapper isFocused={nickname.isFocused} isEmpty={nickname.isEmpty}>
        <Input
          type="text"
          value={nickname.value}
          placeholder="닉네임을 입력하세요"
          onChange={nickname.handleChange}
          onFocus={nickname.handleFocus}
          onBlur={onBlur || nickname.handleBlur}
        />
      </InputWrapper>
    </Container>
  );
};

export default MyPageNicknameInput;

const Container = styled(GrayBoxContainer)`
  margin: 20px 0 10px;
`;
