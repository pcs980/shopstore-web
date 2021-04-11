import React, { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import CustomAlert from '../components/CustomAlert';

import Divider from '../components/Divider';
import { signin } from '../services/user';
import { AppContext } from '../store/AppContext';
import * as styles from '../styles';

const Signin: React.FC = () => {
  const { dispatchUser } = useContext(AppContext);
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const submit = (event: React.MouseEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setError('');
    if (validateForm()) {
      setSubmitting(true);
    }
  }

  const validateForm = (): boolean => {
    let errors = 0;
    if (email.trim() === '') {
      setEmailError('Type your e-mail address');
      errors =+ 1;
    } else {
      setEmailError('');
    }
    if (password.trim() === '') {
      setPasswordError('Type your password');
      errors =+ 1;
    } else {
      setPasswordError('');
    }
    return errors === 0;
  }

  useEffect(() => {
    if (submitting) {
      signin({ email, password })
        .then((response) => {
          setSubmitting(false);
          if (response.token) {
            dispatchUser({
              type: 'SIGNIN',
              data: {
                authenticated: true,
                id: response.id,
                name: response.name,
                email: response.email,
                emailVerified: response.email_verified,
                token: response.token,
              }
            });

            history.push('/');
          } else if (response.error) {
            setError(`${response.error} (${response.code})`);
          } else {
            setError(`Oops... couldn't get server answer`);
          }
        });
    }
  }, [submitting, email, password, history, dispatchUser]);

  return (
    <div style={{ ...styles.centeredPainel }}>
      {
        error && (
          <CustomAlert type='danger' message={error} onClose={() => setError('')} />
        )
      }
      <div style={{ ...styles.bordered, ...styles.largePadded }}>
        <h1 style={{marginBottom: '40px'}}>Sign in</h1>
        <Form noValidate onSubmit={submit} id='signin_form'>
          <Form.Group controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              required
              value={email}
              maxLength={100}
              onChange={({ target }) => {
                setEmail(target.value)
              }}
              type='email'
            />
            <Form.Text style={{ color: 'red' }}>{emailError}</Form.Text>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              value={password}
              maxLength={20}
              onChange={({ target }) => setPassword(target.value)}
              type='password'
            />
            <Form.Text style={{ color: 'red' }}>{passwordError}</Form.Text>
          </Form.Group>
          <div style={{ ...styles.centered }}>
            <Button type='submit' disabled={submitting}>
              {submitting ? 'Please wait...' : 'Sign in'}
            </Button>
          </div>
          <Divider />
          <p>
            Don't you have an account? <Link to='/signup'>Sign up here.</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
