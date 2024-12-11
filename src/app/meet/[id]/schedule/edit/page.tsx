'use client';
import React, { useState } from 'react';
import VoteDates from '@/features/meet/schedule/VoteDates/VoteDates';
import { useRouter } from 'next/navigation';

function EditSchedulePage() {
  const router = useRouter();
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const prev = () => {
    router.push('/meet/1/schedule');
  };

  return (
    <>
      <VoteDates
        type="edit"
        onClickBack={prev}
        onClickComplete={prev}
        selectedDates={selectedDates}
        onChangeDates={setSelectedDates}
      />
    </>
  );
}

export default EditSchedulePage;
