'use client';
import TabBar from '@/components/TabBar';
import ManagementChangeName from '@/features/meet/management/ManagementChangeName';
import ManagementChangeTitle from '@/features/meet/management/ManagementChangeTitle';
import React from 'react';
import styled from 'styled-components';

function ManagementIdPage() {
  return (
    <Container>
      <TabBar />
      <ManagementChangeTitle />
      <ManagementChangeName />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
`;

export default ManagementIdPage;
