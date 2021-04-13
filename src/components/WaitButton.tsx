import React from 'react';
import { Button } from 'react-bootstrap';
import { ButtonVariant } from 'react-bootstrap/esm/types';

interface WaitButtonProps {
  small?: boolean;
  disabled?: boolean;
  text: string;
  type?: string;
  variant?: ButtonVariant;
  onClick?: any;
}

const WaitButton: React.FC<WaitButtonProps> = ({ small, disabled, text, type, variant, onClick }) => {
  return (
    <Button
      size={small ? 'sm' : undefined}
      disabled={disabled}
      type={type ? type : 'button'}
      variant={variant ? variant : 'primary'}
      onClick={onClick ? onClick : () => {}}
    >
      <span style={{ fontSize: small ? 12 : 14 }}>{disabled ? 'Please wait...' : text}</span>
    </Button>
  );
};

export default WaitButton;
