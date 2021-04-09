import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import Divider from '../components/Divider';
import * as styles from '../styles';

const Signin: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const submit = (event: React.MouseEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmiting(true);
    console.log(email, password);

    history.push('/signup');
  }

  return (
    <div style={{ ...styles.centeredPainel }}>
      <div style={{ ...styles.bordered, ...styles.largePadded }}>
        <h1 style={{marginBottom: '40px'}}>Sign in</h1>
        <Form noValidate onSubmit={submit}>
          <Form.Group controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              value={email}
              maxLength={100}
              onChange={({ target }) => setEmail(target.value)}
              type='email'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              maxLength={20}
              onChange={({ target }) => setPassword(target.value)}
              type='password'
            />
          </Form.Group>
          <div style={{ ...styles.centered }}>
            <Button type='submit' disabled={submiting}>
              {submiting ? 'Please wait...' : 'Sign in'}
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
