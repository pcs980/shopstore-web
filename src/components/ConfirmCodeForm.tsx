import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { confirmCode } from '../services/user';
import { confirmCodeAction } from '../store/UserReducer';
import * as styles from '../styles';
import CustomAlert from './CustomAlert';
import WaitButton from './WaitButton';

interface ConfirmCodeFormProps {
  user: any,
  dispatchUser: any,
}

const ConfirmCodeForm: React.FC<ConfirmCodeFormProps> = ({ user, dispatchUser }) => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [submittingCode, setSubmittingCode] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: React.MouseEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      setSubmittingCode(true);
    }
  };

  const validateForm = (): boolean => {
    let errors = 0;
    if (code.trim() === '' || isNaN(Number(code))) {
      setCodeError('Type a valid confirmation code');
      errors =+ 1;
    } else if (Number(code) <= 0) {
      setCodeError('Confirmation code should be greater than zero');
    } else {
      setCodeError('');
    }

    return errors === 0;
  };

  useEffect(() => {
    if (submittingCode) {
      confirmCode({ id: user.id, code })
        .then((response) => {
          setSubmittingCode(false);
          if (response.error) {
            setError(response.error);
          } else if (response.name) {
            setError('');
            dispatchUser(confirmCodeAction());
          } else {
            setError(`Oops... couldn't get server answer`);
          }

        });
      console.log('submitting code', code);
    }
  }, [submittingCode, user, code, dispatchUser]);

  return (
    <div style={styles.centeredPainel}>
      {
        error && (
          <CustomAlert type='danger' message={error} onClose={() => setError('')} />
        )
      }
      <div style={{ ...styles.bordered, ...styles.smallPadded }}>
        <h3 style={{marginBottom: '40px'}}>{`Hi, ${user.name}`}</h3>
        <p>
          Only verified accounts can use our app and we sent to your e-mail a code to verify your account.
        </p>
        <p>
          Please, check your inbox and copy the confirmation code to field below.
        </p>
        <p>
          <b>Also check your spam box.</b>
        </p>
        <Form noValidate onSubmit={submit} id='confirmation_code_form'>
          <Form.Group>
            <Form.Control
              value={code}
              type='number'
              isInvalid={codeError !== ''}
              min={1}
              max={9999}
              onChange={({ target }) => setCode(target.value)}
            />
            <Form.Text style={{ color: 'red' }}>{codeError}</Form.Text>
          </Form.Group>
          <div style={{ ...styles.centered }}>
            <WaitButton
              type='submit'
              disabled={submittingCode}
              text='Verify'
            />
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmCodeForm;
