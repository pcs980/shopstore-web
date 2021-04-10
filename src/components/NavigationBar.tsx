import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { AppContext } from '../store/AppContext';

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
  const { user } = useContext(AppContext);

  if (!user?.authenticated) {
    return (<></>);
  }

  return (
    <Navbar bg='light' expand='md'>
      <Navbar.Brand href='/'>SHOPSTORE</Navbar.Brand>
      <Navbar.Toggle aria-controls='responsive-navbar-nav' />
      <Navbar.Collapse id='responsive-navbar-nav'>
        {
          user.emailVerified && (
            <Nav>
              <NavigationLink to='/customers' label='Customers' />
              <NavigationLink to='/products' label='Products' />
            </Nav>
          )
        }
      </Navbar.Collapse>
      <Nav className='justify-content-end'>
        <NavigationLink to='/signout' label='Sign out' />
        <NavigationLink to='/profile'>
          <Image roundedCircle src='/assets/avatar-placeholder.jpg' style={{ width: 30, height: 30 }} />
        </NavigationLink>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
