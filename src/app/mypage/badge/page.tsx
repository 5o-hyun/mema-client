'use client';
import TabBar from '@/components/TabBar';
import React from 'react';
import BadgeCollection from '@/features/mypage/BadgeCollection';

const BadgeListPage = () => {
  return (
    <>
      <TabBar />
      <BadgeCollection />
    </>
  );
};
export default BadgeListPage;
