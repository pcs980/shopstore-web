import React from 'react';
import { Alert } from 'react-bootstrap';

interface CustomAlertProps {
  type: 'danger' | 'success' | 'warning' | 'info'
  title?: string;
  message: string;
  onClose(): void;
}

const CustomAlert: React.FC<CustomAlertProps> = (props) => {
  return (
    <Alert
      variant={props.type}
      onClose={props.onClose}
      transition
      dismissible
    >
      {
        props.title && (
          <Alert.Heading>{props.title}</Alert.Heading>
        )
      }
      {props.message}
    </Alert>
  );
};

export default CustomAlert;
