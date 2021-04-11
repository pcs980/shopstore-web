import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import { AppContext } from '../store/AppContext';
import ConfirmCodeForm from '../components/ConfirmCodeForm';

const Home: React.FC = () => {
  const { user } = useContext(AppContext);

  return (
    <div style={{ height: 5000}}>
      <NavigationBar />
      {

      }
      {
        !user.emailVerified && (
          <ConfirmCodeForm />
        )
      }
    </div>
  );
}

export default Home;
