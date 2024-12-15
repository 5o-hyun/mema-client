'use client';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import BillCreateName from '@/features/meet/bill/BillCreate/BillCreateName';
import BillCreatePrice from '@/features/meet/bill/BillCreate/BillCreatePrice';
import { useInputState } from '@/lib/hooks/useInputState';
import { createBill, getBill, updateBill } from '@/lib/api/bills';
import { getMeet } from '@/lib/api/meets';
import useToggle from '@/lib/hooks/useToggle';
import { Bill } from '@/types/bills';
import { MeetResponse } from '@/types/meets';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const BillUpsertPage = () => {
  const params = useParams();
  const meetId = (params?.id && Number(params.id)) || null;
  const searchParams = useSearchParams();
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [createData, setCreateData] = useState<{
    content: string;
    totalPrice: number;
    peopleNumber: number;
    memberIds: number[];
  }>({
    content: '',
    totalPrice: 0,
    peopleNumber: 0,
    memberIds: [],
  });
  const {
    value: inputName,
    isFocused,
    isEmpty,
    handleFocus,
    handleBlur,
    handleChange,
    setValue: setInputName,
  } = useInputState();
  const {
    value: inputPrice,
    isFocused: isFocusedPrice,
    isEmpty: isEmptyPrice,
    handleFocus: handleFocusPrice,
    handleBlur: handleBlurPrice,
    handleChange: handleChangePrice,
    setValue: setInputPrice,
  } = useInputState();
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenConfirmModal, toggleOpenConfirmModal] = useToggle();

  const searchParam = Number(searchParams.get('chargeId'));

  const { data: meet } = useQuery<AxiosResponse<MeetResponse>>({
    queryKey: ['meet'],
    queryFn: () => getMeet(meetId as number),
    enabled: meetId !== null,
  });

  const { data: bill } = useQuery<AxiosResponse>({
    queryKey: ['bill', searchParam],
    queryFn: () => getBill({ meetId: Number(params.id), chargeId: searchParam }),
    enabled: searchParam !== 0,
  });

  const createBillMutation = useMutation({
    mutationFn: createBill,
    onSuccess: () => {
      toggleOpenConfirmModal();
      setCreateData({ content: '', totalPrice: 0, peopleNumber: 0, memberIds: [] });
      setInputName('');
      setInputPrice('');
    },
  });

  const updateBillMutation = useMutation({
    mutationFn: updateBill,
    onSuccess: () => {
      toggleOpenConfirmModal();
      setCreateData({ content: '', totalPrice: 0, peopleNumber: 0, memberIds: [] });
      setInputName('');
      setInputPrice('');
    },
  });

  const onClickSelect = (id: number) => {
    setCreateData((prev) => {
      const updatedMemberIds = prev.memberIds ? [...prev.memberIds] : [];

      // id가 배열에 있으면 제거, 없으면 추가
      if (updatedMemberIds.includes(id)) {
        const index = updatedMemberIds.indexOf(id);
        updatedMemberIds.splice(index, 1);
      } else {
        updatedMemberIds.push(id);
      }
      return { ...prev, memberIds: updatedMemberIds };
    });
  };

  const prev = () => {
    setCurrent((prev) => --prev);
  };
  const next = () => {
    setCurrent((prev) => ++prev);
  };

  const onClickAllSelect = () => {
    if (meet) {
      if (isAllSelected) {
        setCreateData((prev) => ({
          ...prev,
          memberIds: [],
        }));
        meet.data.members.map((member) => {
          if (member.isMe) {
            setCreateData((prev) => ({
              ...prev,
              memberIds: [member.userInfo.userId],
            }));
          }
        });
      } else {
        const newMemberIds = meet.data.members.map((member) => member.userInfo.userId);
        setCreateData((prev) => ({
          ...prev,
          memberIds: newMemberIds,
        }));
      }
    }
    setIsAllSelected(!isAllSelected);
  };

  const onClickUpsertBtn = () => {
    setCreateData((prev) => ({
      ...prev,
      peopleNumber: prev.memberIds.length,
    }));
    toggleOpenModal();
  };

  const onClickSubmitBtn = () => {
    // toggleOpenModal();
    if (searchParam === 0) {
      createBillMutation.mutate({
        meetId: meetId as number,
        data: createData,
      });
    } else {
      updateBillMutation.mutate({
        meetId: Number(params.id),
        chargeId: searchParam,
        data: createData,
      });
    }
  };

  useEffect(() => {
    if (meet) {
      meet.data.members.map((member) => {
        if (member.isMe) {
          setCreateData((prev) => ({
            ...prev,
            memberIds: [member.userInfo.userId],
          }));
        }
      });
    }
  }, [meet]);

  useEffect(() => {
    if (bill) {
      setCreateData((prev) => ({
        ...prev,
        content: bill.data[0].content,
        totalPrice: bill.data[0].totalPrice,
        peopleNumber: bill.data[0].peopleNumber,
        memberIds: bill.data[0].members.map(
          (member: { isMe: boolean; me: boolean; memberId: number; nickName: string }) =>
            member.memberId,
        ),
      }));
      setInputName(bill.data[0].content);
      setInputPrice(String(bill.data[0].totalPrice));
    }
  }, [bill]);

  useEffect(() => {
    setCreateData((prev) => ({ ...prev, content: inputName }));
  }, [inputName]);
  useEffect(() => {
    setCreateData((prev) => ({ ...prev, totalPrice: Number(inputPrice) }));
  }, [inputPrice]);

  if (!meet) return;
  const steps = [
    {
      id: 1,
      content: (
        <BillCreateName
          value={inputName}
          isFocused={isFocused}
          isEmpty={isEmpty}
          isDisabled={createData.content === ''}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleChange={handleChange}
          onClickStep1={next}
        />
      ),
    },
    {
      id: 2,
      content: (
        <BillCreatePrice
          data={createData}
          members={meet.data.members}
          value={inputPrice}
          isAllSelected={isAllSelected}
          isFocused={isFocusedPrice}
          isEmpty={isEmptyPrice}
          handleFocus={handleFocusPrice}
          handleBlur={handleBlurPrice}
          handleChange={handleChangePrice}
          onClickBack={prev}
          onClickSelect={onClickSelect}
          onClickAllSelect={onClickAllSelect}
          onClickStep2={onClickUpsertBtn}
        />
      ),
    },
  ];

  return (
    <>
      {steps[current].content}
      {isOpenModal && (
        <Modal type="OkCancel" onOk={onClickSubmitBtn} onClose={toggleOpenModal} width={326}>
          <Text>정산을 공유하시겠어요?</Text>
        </Modal>
      )}
      {isOpenConfirmModal && (
        <Modal type="Ok" onOk={() => router.push(`/meet/${Number(params.id)}/bill`)} width={326}>
          <Text>공유가 완료되었어요!</Text>
        </Modal>
      )}
    </>
  );
};

export default BillUpsertPage;
