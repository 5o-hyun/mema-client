'use client';
import TabBar from '@/components/TabBar';
import TitleWithDescription from '@/components/common/TitleWithDescription';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import React from 'react';
import useToggle from '@/lib/hooks/useToggle';
import styled from 'styled-components';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import PasswordInput from '@/features/account/PasswordInput';
import { useInputState } from '@/hooks/useInputState';

const EditPasswordPage = () => {
  const router = useRouter();
  const [isModalOpen, toggleModal] = useToggle();
  const password = useInputState();

  const handleEditPassword = () => {
    // 비밀번호 수정 로직
    toggleModal();
  };

  return (
    <>
      <TabBar />
      <TitleWithDescription
        title="비밀번호를 잊으셨나요?"
        description="새로운 비밀번호를 입력해주세요"
      />
      <PasswordInput password={password} />
      <StyledButton name="변경하기" onClick={handleEditPassword} disabled={!password.value} />
      {isModalOpen && (
        <Modal
          type="Ok"
          okButtonName="확인"
          onOk={() => {
            router.back();
          }}
          width={326}
        >
          <Text>비밀번호가 변경되었어요!</Text>
        </Modal>
      )}
    </>
  );
};
export default EditPasswordPage;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;
