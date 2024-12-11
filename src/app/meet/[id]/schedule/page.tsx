'use client';
import React, { useState } from 'react';
import useToggle from '@/lib/hooks/useToggle';
import Modal from '@/components/Modal';
import { Emphasize, Text } from '@/components/Modal/modalTypography';
import { useRouter } from 'next/navigation';
import CalendarView from '@/features/meet/schedule/CalendarView';
import { formatDate } from '@/lib/utils/formatDate';
import CalendarViewButtons from '@/features/meet/schedule/CalendarViewButtons';

type CalendarStatus = 'inProgress' | 'needReVote' | 'needComplete' | 'complete';

function SchedulePage() {
  const router = useRouter();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [clickedDay, setDay] = useState<Date | null>(null);
  const tmpDate = new Date();
  const tmpSelectedDates = [
    new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate() + 1),
    new Date(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate() + 2),
  ];
  const status = 'needReVote';

  const movePrevPage = () => {
    router.push('/meet/1');
  };

  return (
    <>
      <CalendarView
        type={status}
        auth="host"
        onClickBack={movePrevPage}
        onClickConfirmDate={toggleOpenModal}
        selectedDates={tmpSelectedDates}
        onChangeDate={setDay}
        clickedDate={clickedDay}
      />
      <CalendarViewButtons type={status} auth="host" />
      {isOpenModal && (
        <Modal
          type="OkCancel"
          onOk={() => {
            console.log('날짜 결정 API 호출');
            movePrevPage();
          }}
          onClose={toggleOpenModal}
          width={326}
        >
          <Text>
            <Emphasize>{clickedDay && formatDate(clickedDay, 'MM월 DD일')}</Emphasize>에 만날까요?
          </Text>
        </Modal>
      )}
    </>
  );
}

export default SchedulePage;
