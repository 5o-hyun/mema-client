'use client';
import Button from '@/components/Button';
import TabBar from '@/components/TabBar';
import BillContent from '@/features/meet/bill/BillContent';
import BillMyPay from '@/features/meet/bill/BillMyPay';
import BillNull from '@/features/meet/bill/BillNull';
import { useRouter } from 'next/navigation';
import React from 'react';
import styled from 'styled-components';

function BillPage() {
  const router = useRouter();

  return (
    <div>
      <TabBar rightType="shareBtn" />
      {/* <BillNull /> */}
      <BillMyPay />
      <BillContent />
      <StyledButton name="정산 시작하기" onClick={() => router.push('/meet/1/bill/create')} />
    </div>
  );
}

const StyledButton = styled(Button)`
  position: fixed;
  bottom: 34px;
  width: 358px;
  @media (max-width: 390px) {
    width: calc(100% - 32px);
  }
`;

export default BillPage;
