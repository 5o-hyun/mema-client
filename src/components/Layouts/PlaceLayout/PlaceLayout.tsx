'use client';
import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode;
};

function PlaceLayout({ children }: Props) {
  return (
    <Container>
      <main>{children}</main>
    </Container>
  );
}

const Container = styled.div`
  width: 390px;
  min-height: 100vh;
  margin: 0 auto;
  position: relative;
  @media (max-width: 390px) {
    width: 100%;
  }
`;

export default PlaceLayout;
