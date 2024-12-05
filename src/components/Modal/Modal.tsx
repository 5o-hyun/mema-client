'use client';
import React from 'react';
import ModalWrapper from './ModalWrapper';
import styled from 'styled-components';
import Button from '@/components/Button';

interface ModalProps {
  type: 'Ok' | 'OkCancel' | 'Action';
  okButtonName?: string;
  closeButtonName?: string;
  actionButtonName?: string;
  onOk: () => void;
  onClose?: () => void;
  onAction?: () => void;
  width?: string | number;
  children: React.ReactNode; // 유연한 내용
}

const Modal: React.FC<ModalProps> = ({
  type = 'Ok',
  okButtonName = '확인',
  closeButtonName = '취소',
  actionButtonName,
  onOk,
  onClose,
  onAction,
  width,
  children,
}) => {
  return (
    <Panel>
      <ModalWrapper
        width={width}
        buttons={
          <ButtonContainer>
            {type === 'OkCancel' && onClose && (
              <CancelButton onClick={onClose} name={closeButtonName} />
            )}
            <ConfirmButton onClick={onOk} name={okButtonName} />
            {type === 'Action' && onAction && (
              <ActionButton onClick={onAction}>{actionButtonName}</ActionButton>
            )}
          </ButtonContainer>
        }
      >
        {children}
      </ModalWrapper>
    </Panel>
  );
};

export default Modal;

const Panel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3); /* 반투명 배경 */
  z-index: ${({ theme }) => theme.zIndex.modal};
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  width: 100%;
`;

const ConfirmButton = styled(Button)`
  flex: 1;
  height: 50px;
`;

const CancelButton = styled(Button)`
  flex: 1;
  height: 50px;
  background: ${({ theme }) => theme.colors.gray[5]};
  &:hover {
    background: ${({ theme }) => theme.colors.gray[5]};
  }
  &:active {
    background: ${({ theme }) => theme.colors.gray[4]};
  }
`;

const ActionButton = styled.button`
  flex: 1 0 100%;
  border: none;
  outline: none;
  background: none;
  padding: 9px 0;
  cursor: pointer;
  width: 100%;
  ${({ theme }) => theme.fonts.text['2xl']};
  color: ${({ theme }) => theme.colors.gray[4]};
`;
