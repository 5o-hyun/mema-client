import React from 'react';
import GrayBoxContainer from '@/features/mypage/GrayBoxContainer';
import styled from 'styled-components';

type Props = {
  selectedColor: string;
  onClick: (color: string) => void;
};

const ColorPalette = ({ selectedColor, onClick }: Props) => {
  const colors = ['blue', 'red', 'yellow', 'green', 'purple', 'black'];

  return (
    <GrayBoxContainer>
      <p className="title">뱃지 컬러</p>
      <ColorChipGrid>
        {colors.map((color) => (
          <ColorChip key={color} $color={color} onClick={() => onClick(color)}>
            {color === selectedColor && <InnerCircle />}
          </ColorChip>
        ))}
      </ColorChipGrid>
    </GrayBoxContainer>
  );
};

export default ColorPalette;

const ColorChipGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  justify-items: center;
  align-items: center;
  cursor: pointer;
`;

const ColorChip = styled.div<{ $color: string }>`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
  background-color: ${({ theme, $color }) => theme.colors[$color]};
`;

const InnerCircle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: transparent;
  box-sizing: border-box;
  border: 2px solid white;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
