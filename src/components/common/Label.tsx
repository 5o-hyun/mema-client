import React from 'react';
import styled from 'styled-components';

interface LabelProps {
  children: React.ReactNode;
  isError?: boolean;
  isEmpty?: boolean;
  isFocused?: boolean;
}

const Label: React.FC<LabelProps> = ({
  children,
  isError = false,
  isEmpty = false,
  isFocused = false,
  ...props
}) => {
  return (
    <StyledLabel $isError={isError} $isEmpty={isEmpty} $isFocused={isFocused} {...props}>
      {children}
    </StyledLabel>
  );
};

export default Label;

const StyledLabel = styled.label<{ $isError: boolean; $isEmpty: boolean; $isFocused: boolean }>`
  display: block;
  flex-basis: 100%;
  padding-bottom: 12px;
  font-size: ${(props) => props.theme.fonts.text['md'].fontSize};
  line-height: ${(props) => props.theme.fonts.text['md'].lineHeight};
  font-family: ${(props) => props.theme.fonts.text['md'].fontFamily};
  font-weight: ${(props) => props.theme.fonts.text['md'].fontWeight};
  letter-spacing: ${(props) => props.theme.fonts.text['md'].letterSpacing};
  color: ${({ $isError, $isEmpty, $isFocused, theme }) => {
    if (!$isEmpty && $isError) return theme.colors.red;
    if ($isFocused) return theme.colors.primary.default;
    if ($isEmpty) return theme.colors.gray[3];
    return theme.colors.gray[3];
  }};
`;
