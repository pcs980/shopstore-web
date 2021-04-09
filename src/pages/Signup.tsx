import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import Divider from '../components/Divider';
import { AppContext } from '../store/AppContext';
import * as styles from '../styles';

const Signup: React.FC = () => {
  const { setUser } = useContext(AppContext);
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submiting, setSubmiting] = useState(false);

  const submit = (event: React.MouseEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setSubmiting(true);
    console.log(name, email, password, confirmPassword);
    setUser({
      type: 'SIGNIN',
      name,
      email,
      token: password,
    })

    history.push('/');
  }

  return (
    <div style={{ ...styles.centeredPainel }}>
      <div style={{ ...styles.bordered, ...styles.largePadded }}>
        <h1 style={{marginBottom: '40px'}}>Create account</h1>
        <Form noValidate onSubmit={submit} id='signup_form'>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              maxLength={100}
              onChange={({ target }) => setName(target.value)}
            />
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              type='email'
              value={email}
              maxLength={100}
              onChange={({ target }) => setEmail(target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              type='password'
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Confirme password</Form.Label>
            <Form.Control
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              type='password'
            />
          </Form.Group>
          <div style={{ ...styles.centered }}>
            <Button type='submit' disabled={submiting}>
              {submiting ? 'Please wait...' : 'Sign up'}
            </Button>
          </div>
          <Divider />
          <p>
          You already have an account? <Link to='/signin'>Sign in.</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
