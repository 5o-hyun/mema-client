import React from 'react';
import styled from 'styled-components';

type TitleWithDescriptionProps = {
  title: React.ReactNode | string;
  description: React.ReactNode | string;
};

const TitleWithDescription: React.FC<TitleWithDescriptionProps> = ({ title, description }) => {
  return (
    <Container>
      <p className="title">{title}</p>
      <p className="description">{description}</p>
    </Container>
  );
};

export default TitleWithDescription;

const Container = styled.div`
  margin: 50px 0 70px;
  .title {
    ${({ theme }) => theme.fonts.title.md};
    margin-bottom: 10px;
  }
  .description {
    ${({ theme }) => theme.fonts.text.lg};
  }
`;
