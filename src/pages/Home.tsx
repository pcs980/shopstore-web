import React from 'react';
import NavigationBar from '../components/NavigationBar';
import * as localStorage from '../utils/localStorage';

const Home: React.FC = () => {
  const user = localStorage.getUser();
  console.log({user});

  return (
    <div style={{ height: 5000}}>
      <NavigationBar />
      Home
    </div>
  );
}

export default Home;
