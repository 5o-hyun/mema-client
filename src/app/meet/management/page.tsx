'use client';

import TabBar from '@/components/TabBar';
import ManagementGrid from '@/features/meet/management/ManagementGrid';
import React from 'react';

function ManagementPage() {
  return (
    <>
      <TabBar />
      <ManagementGrid />
    </>
  );
}

export default ManagementPage;
