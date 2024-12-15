import InputWrapper from '@/components/Input/InputWrapper';
import Input from '@/components/Input';
import React from 'react';
import styled from 'styled-components';
import { UseInputStateReturn } from '@/lib/hooks/useInputState';
import GrayBoxContainer from '@/features/mypage/GrayBoxContainer';

type Props = {
  nickname: UseInputStateReturn;
};

const MyPageNicknameInput = ({ nickname }: Props) => {
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
        />
      </InputWrapper>
    </Container>
  );
};

export default MyPageNicknameInput;

const Container = styled(GrayBoxContainer)`
  margin: 20px 0 10px;
`;
