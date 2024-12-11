'use client';
import TabBar from '@/components/TabBar';
import SettingListItem from '@/features/mypage/SettingListItem';
import React from 'react';
import styled from 'styled-components';
// import { useRouter } from 'next/navigation';

const AccountSettingPage = () => {
  // const router = useRouter();
  return (
    <>
      <TabBar />
      <Container>
        <SettingListItem name="이메일" text="mema123@gmail.com" />
        {/*<SettingListItem  TODO: 고도화 때 진행*/}
        {/*  name="비밀번호 변경"*/}
        {/*  showButton={true}*/}
        {/*  onClick={() => {*/}
        {/*    router.push('/mypage/setting/password');*/}
        {/*  }}*/}
        {/*/>*/}
      </Container>
    </>
  );
};

export default AccountSettingPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
