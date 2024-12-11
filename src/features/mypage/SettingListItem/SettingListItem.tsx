import React from 'react';
import { ChevronRight } from 'react-feather';
import styled from 'styled-components';

type Props = {
  name: string;
  showButton?: boolean;
  onClick?: () => void;
  text?: string;
};

const SettingListItem = ({ name, showButton = false, onClick, text }: Props) => {
  return (
    <Container onClick={onClick} $isClickable={!!onClick}>
      {name}
      {showButton && <RightIcon />}
      {text && <Description>{text}</Description>}
    </Container>
  );
};

export default SettingListItem;

const Container = styled.div<{ $isClickable: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  ${({ theme }) => theme.fonts.text['2xl']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[6]};
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
`;

const RightIcon = styled(ChevronRight)`
  stroke: ${({ theme }) => theme.colors.gray[4]};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.colors.gray[4]};
  ${({ theme }) => theme.fonts.text['2xl']};
`;
