'use client';
import Button from '@/components/Button';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import InputWrapper from '@/components/Input/InputWrapper';
import TabBar from '@/components/TabBar';
import React from 'react';
import styled from 'styled-components';

type Props = {
  value: string;
  isFocused: boolean;
  isEmpty: boolean;
  isDisabled: boolean;
  handleFocus: () => void;
  handleBlur: () => void;
  handleChange: (newValue: string) => void;
  onClickStep1: () => void;
};

const BillCreateName = ({
  value,
  isFocused,
  isEmpty,
  isDisabled,
  handleFocus,
  handleBlur,
  handleChange,
  onClickStep1,
}: Props) => {
  return (
    <Container>
      <TabBar />
      <p className="billCreateNameTitle">어디서 결제했나요?</p>
      <p className="billCreateNameDescription">메이트와 함께한 장소 이름을 알려주세요!</p>
      <InputWrapper isFocused={isFocused} isEmpty={isEmpty}>
        <Label isFocused={isFocused} isEmpty={isEmpty}>
          이름
        </Label>
        <Input
          type="text"
          value={value}
          placeholder="정산 이름을 입력하세요"
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputWrapper>
      <StyledButton name="정산 입력하기" disabled={isDisabled} onClick={onClickStep1} />
    </Container>
  );
};

const Container = styled.div`
  .billCreateNameTitle {
    ${({ theme }) => theme.fonts.title['md']};
    margin: 50px 0 10px;
  }
  .billCreateNameDescription {
    ${({ theme }) => theme.fonts.text['lg']};
    margin-bottom: 70px;
  }
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;

export default BillCreateName;
