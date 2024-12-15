import React from 'react';
import BillStatusItem from '@/features/meet/main/BillStatusItem';

type Props = {
  isAfterMeet: boolean;
  billCount: number;
};

const MeetingBillItem = ({ isAfterMeet, billCount }: Props) => {
  const status = isAfterMeet ? 'completed' : 'notStarted';

  return <BillStatusItem status={status} count={billCount} />;
};

export default MeetingBillItem;
