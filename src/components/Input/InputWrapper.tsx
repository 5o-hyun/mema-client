import React from 'react';
import styled from 'styled-components';

type InputWrapperProps = {
  children: React.ReactNode;
  isError?: boolean;
  isFocused?: boolean;
  isEmpty?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const InputWrapper = ({
  children,
  isError = false,
  isFocused = false,
  isEmpty = false,
  ...props
}: InputWrapperProps) => {
  return (
    <StyledInputWrapper $isError={isError} $isFocused={isFocused} $isEmpty={isEmpty} {...props}>
      {children}
    </StyledInputWrapper>
  );
};

export default InputWrapper;

const StyledInputWrapper = styled.div<{
  $isError: boolean;
  $isFocused: boolean;
  $isEmpty: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 5px;
  width: 100%;
  border-bottom: ${({ $isError, $isFocused, $isEmpty, theme }) => {
    const borderWidth = (!$isEmpty && $isError) || $isFocused ? '2px' : '1px';
    const borderColor = (() => {
      if ($isError && $isFocused && !$isEmpty) return theme.colors.red;
      if ($isFocused) return theme.colors.primary.default;
      if ($isEmpty) return theme.colors.gray[4];
      if ($isError) return theme.colors.red;
      return theme.colors.gray[3];
    })();
    return `${borderWidth} solid ${borderColor}`;
  }};
`;
