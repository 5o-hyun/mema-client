'use client';
import React from 'react';
import Modal from '@/components/Modal';
import styled from 'styled-components';
import { Emphasize, Text } from '@/components/Modal/modalTypography';
import useToggle from '@/lib/hooks/useToggle';
import ManagementContent from './ManagementContent';

function ManagementGrid() {
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  const onDeleteConfirm = () => {
    toggleOpenConfirmModal();
  };

  return (
    <>
      <Container>
        <ManagementContent onDelete={toggleOpenModal} />
      </Container>

      {isOpenModal && (
        <Modal
          type="OkCancel"
          onOk={() => {
            toggleOpenModal();
            toggleOpenConfirmModal();
          }}
          onClose={toggleOpenModal}
          okButtonName="삭제하기"
          width={326}
        >
          <Text>
            <Emphasize>미팅을 삭제하면 복구할 수 없어요.</Emphasize>
            <br />
            정말 삭제하시겠습니까?
          </Text>
        </Modal>
      )}
      {isOpenConfirmModal && (
        <Modal type="Ok" onOk={onDeleteConfirm} width={326}>
          <Text>미팅이 삭제되었습니다.</Text>
        </Modal>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default ManagementGrid;
