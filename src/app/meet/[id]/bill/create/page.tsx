'use client';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import BillCreateName from '@/features/meet/bill/BillCreate/BillCreateName';
import BillCreatePrice from '@/features/meet/bill/BillCreate/BillCreatePrice';
import useToggle from '@/lib/hooks/useToggle';
import React, { useState } from 'react';

const BillCreatePage = () => {
  const [current, setCurrent] = useState(0);
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  const prev = () => {
    setCurrent((prev) => --prev);
  };
  const next = () => {
    setCurrent((prev) => ++prev);
  };

  const steps = [
    { id: 1, content: <BillCreateName onClickStep1={next} /> },
    { id: 2, content: <BillCreatePrice onClickBack={prev} onClickStep2={toggleOpenModal} /> },
  ];

  return (
    <>
      {steps[current].content}
      {isOpenModal && (
        <Modal
          type="OkCancel"
          onOk={() => {
            toggleOpenModal();
            toggleOpenConfirmModal();
          }}
          onClose={toggleOpenModal}
          width={326}
        >
          <Text>정산을 공유하시겠어요?</Text>
        </Modal>
      )}
      {isOpenConfirmModal && (
        <Modal type="Ok" onOk={next} width={326}>
          <Text>공유가 완료되었어요!</Text>
        </Modal>
      )}
    </>
  );
};

export default BillCreatePage;
