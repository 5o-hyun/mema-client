'use client';
import React, { useCallback, useState } from 'react';
import VoteDueDate from '@/features/meet/schedule/VoteDueDate/VoteDueDate';
import useToggle from '@/lib/hooks/useToggle';
import Modal from '@/components/Modal';
import { Text } from '@/components/Modal/modalTypography';
import { useParams, useRouter } from 'next/navigation';
import TabBar from '@/components/TabBar';
import VoteDatesView from '@/features/meet/schedule/CreateCalendarView/CreateCalendarView';
import { createSchedule } from '@/lib/api/schedules';
import { useMutation } from '@tanstack/react-query';
import { formatDate, formatDateForRequset } from '@/lib/utils/dateUtils';
import { CreateScheduleData } from '@/types/schedules';
import { userMeetStore } from '@/store/userMeetStore';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/error';

function CreateSchedulePage() {
  const router = useRouter();
  const params = useParams();
  const meetId = params?.id && Number(params.id);
  const { getMeetMemberId } = userMeetStore();
  const myMeetMemberId = meetId ? getMeetMemberId(meetId) : null;

  const [currentStep, setCurrentStep] = useState(0);
  const [isOpenModal, toggleOpenModal] = useToggle();
  const [isOpenPastTimeModal, togglePastTimeModal] = useToggle();
  const [voteDueDate, setVoteDueDate] = useState<Date>(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const prev = () => {
    setCurrentStep((prev) => --prev);
  };
  const next = () => {
    if (voteDueDate < new Date()) {
      togglePastTimeModal();
      return;
    }
    setCurrentStep((prev) => ++prev);
  };

  const getFormattedDates = useCallback(() => {
    return selectedDates.map((date) => formatDate(date, 'YYYY-MM-DD'));
  }, [selectedDates]);

  const createDateVoteMutation = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      toggleOpenModal();
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data.code === 'VD003') {
        prev();
        togglePastTimeModal();
      } else if (error.response?.data.code === 'VD006') {
        handleCreateSchedule(false);
        router.push(`/schedule/${meetId}`);
      }
    },
  });

  const handleCreateSchedule = useCallback(
    (includeExpiredDate = true) => {
      if (!meetId || !myMeetMemberId) return;

      const data: CreateScheduleData = {
        meetMemberId: myMeetMemberId,
        voteDates: getFormattedDates(),
        ...(includeExpiredDate && { expiredVoteDate: formatDateForRequset(voteDueDate) }),
      };

      createDateVoteMutation.mutate({ meetId, data });
    },
    [createDateVoteMutation, voteDueDate, getFormattedDates, meetId, myMeetMemberId],
  );

  const steps = [
    {
      id: 1,
      content: <VoteDueDate onClickNext={next} date={voteDueDate} onChange={setVoteDueDate} />,
    },
    {
      id: 2,
      content: (
        <VoteDatesView
          type="create"
          mySelectedDates={selectedDates}
          onChangeDates={setSelectedDates}
          onClickComplete={handleCreateSchedule}
        />
      ),
      onClickBack: prev,
    },
  ];
  if (!meetId) return;

  return (
    <>
      <TabBar onClickBack={steps[currentStep]?.onClickBack} />
      {steps[currentStep].content}

      {isOpenModal && (
        <Modal type="Ok" onOk={() => router.push(`/meet/${meetId}/schedule`)} width={326}>
          <Text>투표를 완료했어요!</Text>
        </Modal>
      )}
      {isOpenPastTimeModal && (
        <Modal type="Ok" onOk={togglePastTimeModal} width={326}>
          <Text>만료 시각이 현재보다 이전입니다.</Text>
        </Modal>
      )}
    </>
  );
}

export default CreateSchedulePage;
