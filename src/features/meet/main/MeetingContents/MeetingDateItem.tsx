import React from 'react';
import MeetingStatusItem from '@/features/meet/main/MeetingStatusItem';
import { formatDateToMMDD } from '@/lib/utils/dateUtils';

type Props = {
  totalMembers: number;
  voteExpiredDate: Date | null;
  meetDate?: string | null;
  votedMembers: number;
  warningMessage?: string;
};

const MeetingDateItem = ({
  totalMembers,
  voteExpiredDate,
  meetDate,
  votedMembers,
  warningMessage,
}: Props) => {
  const status: 'notStarted' | 'inProgress' | 'completed' =
    meetDate !== null ? 'completed' : voteExpiredDate !== null ? 'inProgress' : 'notStarted';

  const voteResult = meetDate ? formatDateToMMDD(meetDate) : '';

  return (
    <MeetingStatusItem
      status={status}
      title="만나는 날짜 정하기"
      totalMembers={totalMembers}
      votedMembers={votedMembers}
      warningMessage={warningMessage}
      voteResult={voteResult}
    />
  );
};

export default MeetingDateItem;
