import React from 'react';
import MeetingStatusItem from '@/features/meet/main/MeetingStatusItem';

type Props = {
  totalMembers: number;
  voteExpiredLocation: Date | null;
  meetLocation: string | null;
  votedMembers: number;
  warningMessage?: string;
};

const MeetingPlaceItem = ({
  totalMembers,
  voteExpiredLocation,
  meetLocation,
  votedMembers,
  warningMessage,
}: Props) => {
  const status: 'notStarted' | 'inProgress' | 'completed' =
    meetLocation !== null
      ? 'completed'
      : voteExpiredLocation !== null
        ? 'inProgress'
        : 'notStarted';

  return (
    <MeetingStatusItem
      status={status}
      title="만나는 장소 정하기"
      totalMembers={totalMembers}
      votedMembers={votedMembers}
      warningMessage={warningMessage}
    />
  );
};

export default MeetingPlaceItem;
