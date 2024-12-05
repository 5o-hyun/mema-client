import React from 'react';
import styled from 'styled-components';
import { Eye, EyeOff } from 'react-feather';
import { useTheme } from 'styled-components';

interface ToggleVisibilityButtonProps {
  isVisible: boolean;
  onClick: () => void;
}

const Button = styled.button`
  margin-right: 8px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const ToggleVisibilityButton: React.FC<ToggleVisibilityButtonProps> = ({ isVisible, onClick }) => {
  const theme = useTheme();

  return (
    <Button onClick={onClick} type="button">
      {isVisible ? (
        <EyeOff size={24} color={theme.colors.gray[4]} />
      ) : (
        <Eye size={24} color={theme.colors.gray[4]} />
      )}
    </Button>
  );
};

export default ToggleVisibilityButton;
