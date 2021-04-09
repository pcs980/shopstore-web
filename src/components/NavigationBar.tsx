import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Nav, Navbar } from 'react-bootstrap';
import { AppContext } from '../store/AppContext';
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
      activeStyle={{
        color: colors.primary
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
        <Nav>
          <NavigationLink to='/customers' label='Customers' />
          <NavigationLink to='/products' label='Products' />
        </Nav>
      </Navbar.Collapse>
      <Nav className='justify-content-end'>
        <NavigationLink to='/customers'>
          <Image roundedCircle src='/assets/avatar-placeholder.jpg' style={{ width: 30, height: 30 }} />
        </NavigationLink>
      </Nav>
    </Navbar>
  );
}

export default NavigationBar;
