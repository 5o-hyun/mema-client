import styled from 'styled-components';
import MemaIcon from '@/assets/icons/svg/mema.svg';
import SelectedMemaIcon from '@/assets/icons/svg/memaFilled.svg';
import CalendarIcon from '@/assets/icons/svg/calendar.svg';
import SelectedCalendarIcon from '@/assets/icons/svg/calendarFilled.svg';
import { useRouter } from 'next/navigation';

type Props = {
  tab?: 'calendar' | 'mypage';
};
const BottomNavigation = ({ tab = 'calendar' }: Props) => {
  const router = useRouter();
  return (
    <Container>
      <NavItem onClick={() => router.push('/')}>
        {tab === 'calendar' ? <SelectedCalendarIcon /> : <CalendarIcon />}
      </NavItem>
      <NavItem onClick={() => router.push('/mypage')}>
        {tab === 'mypage' ? <SelectedMemaIcon /> : <MemaIcon />}
      </NavItem>
    </Container>
  );
};

export default BottomNavigation;

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 390px;
  background-color: white;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[5]};
  z-index: ${({ theme }) => theme.zIndex.navigation};
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  padding-bottom: 34px;
`;

const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 16px 0;
  svg {
    width: 24px;
    height: 24px;
  }
`;
