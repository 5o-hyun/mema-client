import Button from '@/components/Button';
import Label from '@/components/common/Label';
import Input from '@/components/Input';
import InputWrapper from '@/components/Input/InputWrapper';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import { useInputState } from '@/lib/hooks/useInputState';
import { getMeet, updateMeet } from '@/lib/api/meets';
import useToggle from '@/lib/hooks/useToggle';
import { MeetResponse } from '@/types/meets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styled from 'styled-components';

function ManagementChangeName() {
  const {
    value: meetName,
    isFocused,
    isEmpty,
    handleFocus,
    handleBlur,
    handleChange,
  } = useInputState();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const router = useRouter();
  const params = useParams();

  const { data: meet } = useQuery<AxiosResponse<MeetResponse>>({
    queryKey: ['meet'],
    queryFn: () => getMeet(Number(params.id)),
  });

  const updateMeetMutation = useMutation({
    mutationFn: updateMeet,
    onSuccess: () => {
      toggleOpenModal();
    },
  });

  const onSubmit = () => {
    if (!meet) {
      return;
    }
    updateMeetMutation.mutate({ meetId: Number(params.id), meetName: meetName });
  };

  useEffect(() => {
    if (!meet) {
      return;
    }

    handleChange(meet.data.meetName);
  }, [meet, handleChange]);

  return (
    <>
      <InputWrapper isFocused={isFocused} isEmpty={isEmpty}>
        <Label isFocused={isFocused} isEmpty={isEmpty}>
          닉네임
        </Label>
        <Input
          type="text"
          value={meetName}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputWrapper>
      <StyledButton name="미팅명 변경하기" onClick={onSubmit} />
      {isOpenModal && (
        <Modal
          type="Ok"
          onOk={() => {
            toggleOpenModal();
            router.push('/meet/management');
          }}
          width={326}
        >
          <Text>미팅명이 변경되었습니다.</Text>
        </Modal>
      )}
    </>
  );
}

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;

export default ManagementChangeName;
