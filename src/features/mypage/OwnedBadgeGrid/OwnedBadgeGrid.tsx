import { ChevronRight } from 'react-feather';
import MemberIcon from '@/components/common/MemberIcon';
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import GrayBoxContainer from '@/features/mypage/GrayBoxContainer';
import Button from '@/components/Button';

type Props = {
  selectedId: number;
  ownedBadges: number[];
  onClick: (id: number) => void;
};

const OwnedBadgeGrid = ({ selectedId, ownedBadges, onClick }: Props) => {
  const router = useRouter();
  const MAX_BADGE_COUNT = 12;
  const badgeIds = Array.from({ length: MAX_BADGE_COUNT }, (_, i) => i + 1);

  return (
    <BadgeContainer>
      <ProfileBadgeTitle>
        <p className="title">프로필 뱃지</p>
        <ChevronRight
          onClick={() => {
            router.push('/mypage/badge');
          }}
        />
      </ProfileBadgeTitle>
      <BadgeIconGrid>
        {badgeIds.map((badgeId) => (
          <MemberIcon
            key={badgeId}
            puzzleId={badgeId}
            puzzleColor="blue"
            size={74}
            selected={badgeId === selectedId}
            disabled={!ownedBadges.includes(badgeId)}
            onClick={() => onClick(badgeId)}
          />
        ))}
      </BadgeIconGrid>
    </BadgeContainer>
  );
};

export default OwnedBadgeGrid;

const BadgeContainer = styled(GrayBoxContainer)`
  margin-bottom: 10px;
`;

const ProfileBadgeTitle = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    padding: 4px;
    cursor: pointer;
  }
`;

const BadgeIconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
`;
