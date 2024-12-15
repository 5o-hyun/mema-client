'use client';
import React, { useState } from 'react';
import Modal from '@/components/Modal';
import styled from 'styled-components';
import { Emphasize, Text } from '@/components/Modal/modalTypography';
import useToggle from '@/lib/hooks/useToggle';
import ManagementContent from './ManagementContent';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteMeet, getHomeMeets } from '@/lib/api/meets';
import { useRouter } from 'next/navigation';
import { HomeMeetsResponse } from '@/types/meets';
import { AxiosResponse } from 'axios';

function ManagementGrid() {
  const router = useRouter();
  const [meetId, setMeetId] = useState<number>(0);
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  const { data: meets, refetch: refetchMeets } = useQuery<AxiosResponse<HomeMeetsResponse>>({
    queryKey: ['meets'],
    queryFn: getHomeMeets,
  });

  const deleteMeetMutation = useMutation({
    mutationFn: deleteMeet,
    onSuccess: () => {
      toggleOpenModal();
      refetchMeets();
      toggleOpenConfirmModal();
    },
  });

  const onDelete = () => {
    deleteMeetMutation.mutate(meetId);
  };

  return (
    <>
      <Container>
        {meets?.data.upcomingMeets.map((meet) => (
          <ManagementContent
            key={meet.meetId}
            meet={meet}
            onDelete={(id: number) => {
              setMeetId(id);
              toggleOpenModal();
            }}
          />
        ))}
        {meets?.data.pastMeets.map((meet) => (
          <ManagementContent key={meet.meetId} meet={meet} onDelete={toggleOpenModal} />
        ))}
      </Container>

      {isOpenModal && (
        <Modal
          type="OkCancel"
          onOk={onDelete}
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
        <Modal
          type="Ok"
          onOk={() => {
            toggleOpenConfirmModal();
            router.push('/meet/management');
          }}
          width={326}
        >
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
