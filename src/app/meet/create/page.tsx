'use client';
import React from 'react';
import TabBar from '@/components/TabBar';
import TitleWithDescription from '@/components/common/TitleWithDescription';
import MeetingNameInput from '@/features/meet/create/MeetingNameInput';
import { useInputState } from '@/hooks/useInputState';
import styled from 'styled-components';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';
import MeetingCreatedGuide from '@/features/meet/create/MeetingCreatedGuide';
import Modal from '@/components/Modal';
import { LargeText, Text } from '@/components/Modal/modalTypography';
import useToggle from '@/lib/hooks/useToggle';
import CopyToClipboard from 'react-copy-to-clipboard';

const CreateMeetingPage = () => {
  const router = useRouter();
  const meetingName = useInputState();
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isOpenModal, toggleOpenModal] = useToggle();
  const joinCode = '1234';

  const prev = () => {
    setCurrentStep((prev) => --prev);
  };
  const next = () => {
    setCurrentStep((prev) => ++prev);
  };

  const steps = [
    {
      id: 1,
      contents: (
        <>
          <TitleWithDescription
            title="새로운 미팅의 이름을 알려주세요!"
            description="미팅 이름은 최대 8글자까지 설정할 수 있어요"
          />
          <MeetingNameInput meetingName={meetingName} />
          <StyledButton name="다음으로" disabled={!meetingName.value} onClick={next} />
        </>
      ),
    },
    {
      id: 2,
      contents: (
        <>
          <MeetingCreatedGuide />
          <CopyToClipboard text={joinCode} onCopy={toggleOpenModal}>
            <TextButton>참여 코드 복사하기</TextButton>
          </CopyToClipboard>
          <StyledButton
            name="홈으로"
            disabled={!meetingName.value}
            onClick={() => router.push('/')}
          />
        </>
      ),
    },
  ];

  return (
    <>
      <TabBar />
      {steps[currentStep].contents}
      {isOpenModal && (
        <Modal type="Ok" onOk={toggleOpenModal} width={326}>
          <Text>
            참여코드 복사 완료!
            <br />
          </Text>
          <LargeText>1234</LargeText>
        </Modal>
      )}
    </>
  );
};

export default CreateMeetingPage;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 34px;
  width: calc(100% - 32px);
`;

const TextButton = styled.p`
  ${({ theme }) => theme.fonts.text['2xl']};
  color: ${({ theme }) => theme.colors.gray[4]};
  cursor: pointer;
  position: absolute;
  bottom: 110px;
  text-align: center;
  width: fit-content;
  margin: 0 auto;
  left: 0;
  right: 0;
`;
