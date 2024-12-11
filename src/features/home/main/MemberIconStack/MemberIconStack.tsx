import styled from 'styled-components';
import MemberIcon from '@/components/common/MemberIcon';
import { MoreHorizontal } from 'react-feather';

type IconStackProps = {
  members: { puzzleId: number; puzzleColor: string }[];
};

const MemberIconStack: React.FC<IconStackProps> = ({ members }) => {
  const MAX_ICONS = 7; // 최대 표시 아이콘 개수

  return (
    <MembersWrapper>
      {members.slice(0, MAX_ICONS).map((member, index) => (
        <StackedIcon
          key={index}
          style={{ zIndex: MAX_ICONS - index }} // 앞쪽 아이콘이 위로 쌓이도록 설정
        >
          <MemberIcon
            puzzleId={member.puzzleId}
            puzzleColor={member.puzzleColor}
            size={40}
            showShadow={true}
          />
        </StackedIcon>
      ))}
      {members.length > MAX_ICONS && (
        <MoreWrapper>
          <MoreHorizontal />
        </MoreWrapper>
      )}
    </MembersWrapper>
  );
};

export default MemberIconStack;

const MembersWrapper = styled.div`
  position: relative; /* 자식 요소의 위치 기준 */
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const StackedIcon = styled.div`
  position: relative;
  margin-left: -10px; /* 아이콘이 10px씩 겹치도록 설정 */
`;

const MoreWrapper = styled.div`
  position: relative;
  margin-left: -10px; /* 마지막 아이콘도 동일하게 겹침 */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    stroke: ${({ theme }) => theme.colors.gray[4]};
    width: 24px;
    height: 24px;
  }
`;
