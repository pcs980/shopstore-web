import React from 'react';
import { Form } from 'react-bootstrap';
import NavigationBar from '../components/NavigationBar';
import * as localStorage from '../utils/localStorage';
import { formatDate } from '../utils/dates';
import * as styles from '../styles';

const Profile: React.FC = () => {
  const user = localStorage.getUser();

  return (
    <div style={{ height: 5000}}>
      <NavigationBar />
      <div style={styles.centeredPainel}>
        <div style={{ ...styles.bordered, ...styles.largePadded }}>
          <h3>My Profile</h3>
          <Form noValidate id='profile_form'>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={user.name}
                disabled
              />
            </Form.Group>
            <Form.Group controlId='email'>
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                value={user.email}
                disabled
              />
            </Form.Group>
            <Form.Group controlId='registeredAt'>
              <Form.Label>Registered At</Form.Label>
              <Form.Control
                disabled
                value={formatDate(user.registeredAt)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type='switch'
                id='email_verified'
                label='E-mail verified'
                checked={user.emailVerified}
                disabled
              />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
