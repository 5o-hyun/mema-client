'use client';

import React from 'react';
import styled from 'styled-components';

type ModalWrapperProps = {
  children: React.ReactNode;
  buttons?: React.ReactNode;
  width?: string | number;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalWrapper = ({ children, buttons, width = '100%', ...props }: ModalWrapperProps) => {
  return (
    <ModalBox $width={width} {...props}>
      <ModalContent>{children}</ModalContent>
      {buttons && <Buttons>{buttons}</Buttons>}
    </ModalBox>
  );
};

export default ModalWrapper;

const ModalBox = styled.div<{ $width: string | number }>`
  display: flex;
  flex-direction: column;
  padding: 40px 16px 16px 16px;
  width: ${({ $width }) => (typeof $width === 'number' ? `${$width}px` : $width)};
  border-radius: 15px;
  background: white;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

const ModalContent = styled.div`
  flex: 1;
  width: 100%;
  text-align: center;
  margin-bottom: 40px;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
`;
