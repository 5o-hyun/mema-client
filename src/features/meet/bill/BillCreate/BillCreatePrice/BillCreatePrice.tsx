'use client';
import React from 'react';
import BillCreateTabBar from '../BillCreateTabBar';
import styled from 'styled-components';
import Input from '@/components/Input';
import InputWrapper from '@/components/Input/InputWrapper';
import { useInputState } from '@/hooks/useInputState';
import Button from '@/components/Button';

type Props = {
  onClickBack: () => void;
  onClickStep2: () => void;
};

const BillCreatePrice = ({ onClickBack, onClickStep2 }: Props) => {
  const price = useInputState();

  return (
    <Container>
      <BillCreateTabBar onClick={onClickBack} />
      <p className="billCreatePriceTitle">
        <b>봉추찜닭</b>에서의
        <br />
        결제 금액을 알려주세요!
      </p>
      <InputWrapper>
        <Input
          value={price.value}
          placeholder="금액 입력하기 (원)"
          onChange={price.handleChange}
          onFocus={price.handleFocus}
          onBlur={price.handleBlur}
        />
      </InputWrapper>
      <div className="billCreatePersonContainer">
        <div className="billCreatePersonTop">
          <p>누구와 함께했나요?</p>
          <div className="allSelectBtn">전체 선택</div>
        </div>
        <div className="billCreatePersonBtnG">
          <div className="billCreatePersonBtn">쌈뽕한메마러버</div>
          <div className="billCreatePersonBtn">쌈뽕한메마러버</div>
          <div className="billCreatePersonBtn">쌈뽕한버</div>
          <div className="billCreatePersonBtn">쌈뽕한메마러버</div>
          <div className="billCreatePersonBtn">쌈뽕한메마러버</div>
        </div>
      </div>
      <div className="billCreateBottom">
        <div className="wrapper">
          <p>
            <b>0</b>원 ÷ <b>0</b>명
          </p>
          <p>
            인당 결제 금액은
            <br />
            <b>0</b>원 이에요!
          </p>
        </div>
        <Button name="정산 공유하기" onClick={onClickStep2} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .billCreatePriceTitle {
    font-size: ${({ theme }) => theme.fonts.text['2xl']};
    margin-bottom: 20px;
    b {
      ${({ theme }) => theme.fonts.title['md']};
    }
  }
  .billCreatePersonContainer {
    margin: 70px 0 20px;
    .billCreatePersonTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: ${({ theme }) => theme.fonts.text['2xl']};
      margin-bottom: 20px;
      .allSelectBtn {
        padding: 4px 10px;
        color: ${({ theme }) => theme.colors.gray[4]};
        ${({ theme }) => theme.fonts.text['md']};
        cursor: pointer;
      }
    }
    .billCreatePersonBtnG {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      .billCreatePersonBtn {
        padding: 4px 10px;
        border-radius: ${({ theme }) => theme.borderRadius.medium};
        background-color: ${({ theme }) => theme.colors.gray[6]};
        color: ${({ theme }) => theme.colors.black};
        cursor: pointer;
        &.active {
          background-color: ${({ theme }) => theme.colors.primary.default};
          color: ${({ theme }) => theme.colors.white};
        }
      }
    }
  }
  .billCreateBottom {
    background-color: ${({ theme }) => theme.colors.white};
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 358px;
    padding-bottom: 34px;
    @media (max-width: 390px) {
      width: calc(100% - 32px);
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
      font-size: ${({ theme }) => theme.fonts.text['2xl']};
      b {
        ${({ theme }) => theme.fonts.title['md']};
      }
    }
  }
`;

export default BillCreatePrice;
