import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import * as localStorage from '../utils/localStorage';
import colors from '../styles/colors';

interface NavigationLinkProps {
  to: string;
  label?: string;
  children?: JSX.Element;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, label, children }) => {
  return (
    <NavLink
      to={to}
      style={{
        marginLeft: 6,
        marginRight: 6,
      }}
      activeStyle={{
        fontWeight: 'bold'
      }}
    >
      { label ?  label : children}
    </NavLink>
  );
};

const NavigationBar: React.FC = () => {
  const user = localStorage.getUser();

  if (!user?.token) {
    return (<></>);
  }

  return (
    <Navbar bg='light' expand='md'>
      <Navbar.Brand href='/'>SHOPSTORE</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-end'>
        {
          user.emailVerified && (
            <Nav className='mr-auto'>
              <NavigationLink to='/customers' label='Customers' />
              <NavigationLink to='/products' label='Products' />
            </Nav>
          )
        }
      </Navbar.Collapse>
      <NavigationLink to='/signout'>
        <Navbar.Text style={{ color: colors.red }}>Sign out</Navbar.Text>
      </NavigationLink>
      <NavigationLink to='/profile'>
        <Image roundedCircle src='/assets/avatar-placeholder.jpg' style={{ width: 30, height: 30 }} />
      </NavigationLink>
    </Navbar>
  );
}

export default NavigationBar;
