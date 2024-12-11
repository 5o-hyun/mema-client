'use client';
import React from 'react';
import TabBar from '@/components/TabBar';
import Button from '@/components/Button';
import MeetingJoinGuide from '@/features/meet/join/MeetingJoinGuide';
import JoinCodeInput from '@/features/meet/join/JoinCodeInput';
import { useInputState } from '@/hooks/useInputState';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import useToggle from '@/lib/hooks/useToggle';

const JoinMeetingPage = () => {
  const joinCode = useInputState();
  const [isOpenModal, toggleOpenModal] = useToggle();

  return (
    <>
      <TabBar />
      <MeetingJoinGuide />
      <JoinCodeInput joinCode={joinCode} />
      <StyledButton name="입력 완료" disabled={!joinCode.value} onClick={toggleOpenModal} />
      {isOpenModal && (
        <Modal type="Ok" onOk={toggleOpenModal} width={326}>
          <Text>유효하지 않은 참여 코드에요!</Text>
        </Modal>
      )}
    </>
  );
};

export default JoinMeetingPage;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;
