import styled from 'styled-components';

const GrayBoxContainer = styled.div`
  padding: 16px;
  box-sizing: border-box;
  border-radius: 15px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray[6]};

  .title {
    ${({ theme }) => theme.fonts.title.xs};
    margin-bottom: 10px;
  }
`;

export default GrayBoxContainer;
