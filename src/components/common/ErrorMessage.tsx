import styled from 'styled-components';

interface ErrorMessageProps {
  errorMessage?: string;
}

const ErrorMessage = ({ errorMessage }: ErrorMessageProps) => {
  return <StyledDiv>{errorMessage}</StyledDiv>;
};

export default ErrorMessage;

const StyledDiv = styled.div`
  ${({ theme }) => theme.fonts.text.sm};
  color: ${({ theme }) => theme.colors.red};
`;
