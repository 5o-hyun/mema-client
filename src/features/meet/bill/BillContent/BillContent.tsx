'use client';
import React from 'react';
import styled from 'styled-components';

type Props = {
  content: string;
  payeeNickname: string;
  totalPrice: number;
  peopleNumber: number;
  payers: {
    payerId: number;
    payerNickname: string;
  }[];
  onClick: () => void;
};

const BillContent = ({
  content,
  payeeNickname,
  totalPrice,
  peopleNumber,
  payers,
  onClick,
}: Props) => {
  return (
    <Container onClick={onClick}>
      <div className="billContentTextGroup">
        <p className="billContentPlace">{content}</p>
        <p className="billContentPaymentPerson">{payeeNickname}</p>
      </div>
      <div className="billContentPayment">
        <p>
          <b>{totalPrice}</b>원 ÷ <b>{peopleNumber}</b>명으로
        </p>
        <p>인당 결제 금액은</p>
        <p>
          <b className="price">{totalPrice / peopleNumber}</b>원 이에요!
        </p>
      </div>
      <div className="billContentPayment">
        <p>함께한 사람은</p>
        <p>
          <b>{payers.map((payer) => payer.payerNickname).join(', ')}</b> 입니다!
        </p>
      </div>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 10px;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[6]};
  cursor: pointer;
  .billContentTextGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .billContentPlace {
      ${({ theme }) => theme.fonts.title['md']};
    }
    .billContentPaymentPerson {
      color: ${({ theme }) => theme.colors.gray[2]};
      ${({ theme }) => theme.fonts.text['xl']};
    }
  }
  .billContentPayment {
    border-radius: ${({ theme }) => theme.borderRadius.small};
    margin-bottom: 10px;
    padding: 12px 16px;
    background-color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fonts.text['2xl']};
    b {
      ${({ theme }) => theme.fonts.title['md']};
      &.price {
        color: ${({ theme }) => theme.colors.primary.default};
      }
    }
  }
`;

export default BillContent;
