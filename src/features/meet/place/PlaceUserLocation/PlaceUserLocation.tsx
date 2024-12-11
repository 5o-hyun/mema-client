'use client';
import React from 'react';
import { Crosshair } from 'react-feather';
import styled from 'styled-components';

type Props = {
  onClick: () => void;
};

const PlaceUserLocation = ({ onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <Crosshair />
    </Container>
  );
};

const Container = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
  right: 16px;
  bottom: 110px;
  display: grid;
  place-content: center;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  z-index: 1;
`;

export default PlaceUserLocation;
