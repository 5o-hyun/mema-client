'use client';

import React from 'react';
import styled from 'styled-components';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({ onChange, ...props }) => {
  return <StyledInput onChange={(e) => onChange(e.target.value)} {...props} />;
};

export default Input;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  padding: 0;
  ${({ theme }) => theme.fonts.text['2xl']};
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[4]};
  }
  &:focus::placeholder {
    color: ${({ theme }) => theme.colors.gray[3]};
  }
`;
