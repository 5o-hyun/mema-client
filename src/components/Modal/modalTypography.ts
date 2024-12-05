import styled from 'styled-components';

export const Text = styled.span`
  ${({ theme }) => theme.fonts.title['sm']};
  text-align: center;
`;

export const Emphasize = styled.span`
  color: ${({ theme }) => theme.colors.primary.default};
`;

export const DisabledText = styled.span`
  margin-top: 20px;
  display: block;
  ${({ theme }) => theme.fonts.text['2xl']};
  color: ${({ theme }) => theme.colors.gray[4]};
`;

export const LargeText = styled.span`
  ${({ theme }) => theme.fonts.title['xl']};
  text-align: center;
`;
