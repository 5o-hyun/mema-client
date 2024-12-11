import styled from 'styled-components';

import Icon1 from '@/assets/profileIcons/svg/1.svg';
import Icon2 from '@/assets/profileIcons/svg/2.svg';
import Icon3 from '@/assets/profileIcons/svg/3.svg';
import Icon4 from '@/assets/profileIcons/svg/4.svg';
import Icon5 from '@/assets/profileIcons/svg/5.svg';
import Icon6 from '@/assets/profileIcons/svg/6.svg';
import Icon7 from '@/assets/profileIcons/svg/7.svg';
import Icon8 from '@/assets/profileIcons/svg/8.svg';
import Icon9 from '@/assets/profileIcons/svg/9.svg';
import Icon10 from '@/assets/profileIcons/svg/10.svg';
import Icon11 from '@/assets/profileIcons/svg/11.svg';
import Icon12 from '@/assets/profileIcons/svg/12.svg';
import React from 'react';

const iconMap: Record<number, React.FC<React.SVGProps<SVGSVGElement>>> = {
  1: Icon1,
  2: Icon2,
  3: Icon3,
  4: Icon4,
  5: Icon5,
  6: Icon6,
  7: Icon7,
  8: Icon8,
  9: Icon9,
  10: Icon10,
  11: Icon11,
  12: Icon12,
};

type MemberIconProps = {
  puzzleId: number;
  puzzleColor: string;
  size: number;
  showShadow?: boolean;
  disabled?: boolean;
  selected?: boolean;
  onClick?: () => void;
};

const MemberIcon: React.FC<MemberIconProps> = ({
  puzzleId,
  puzzleColor,
  size = 40,
  showShadow = false,
  disabled = false,
  selected = false,
  onClick,
}) => {
  const IconComponent = iconMap[puzzleId];
  if (!IconComponent) {
    return null;
  }

  return (
    <IconWrapper
      $size={size}
      $color={puzzleColor}
      $showShadow={showShadow}
      $disabled={disabled}
      $selected={selected}
      onClick={onClick}
    >
      <IconComponent />
    </IconWrapper>
  );
};

export default MemberIcon;

const IconWrapper = styled.div<{
  $size: number;
  $color: string;
  $showShadow: boolean;
  $disabled: boolean;
  $selected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $size }) => `${$size}px`};
  height: ${({ $size }) => `${$size}px`};
  border-radius: 50%;
  ${({ $showShadow }) =>
    $showShadow && `box-shadow: 1.667px 0px 8.333px 0px rgba(0, 0, 0, 0.06);`} /* 그림자 */
  ${({ $disabled }) => $disabled && 'pointer-events: none;'}
  opacity: ${({ $disabled }) => ($disabled ? 0.35 : 1)};
  box-sizing: border-box;
  ${({ $selected, theme }) =>
    $selected &&
    `
      outline: 2px solid ${theme.colors.primary.default}; 
      outline-offset: -2px;
  `}

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ $color, theme }) => theme.colors[$color]};
  }
`;
