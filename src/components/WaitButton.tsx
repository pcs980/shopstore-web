import React from 'react';
import { Button } from 'react-bootstrap';

interface WaitButtonProps {
  disabled?: boolean;
  text: string;
  type?: string;
  variant?: string;
  onClick?: any;
}

const WaitButton: React.FC<WaitButtonProps> = ({ disabled, text, type, variant, onClick }) => {
  return (
    <Button
      disabled={disabled}
      type={type ? type : 'button'}
      variant={variant ? variant : 'primary'}
      onClick={onClick ? onClick : () => {}}
    >
      {disabled ? 'Please wait...' : text}
    </Button>
  );
};

export default WaitButton;
