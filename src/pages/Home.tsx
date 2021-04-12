import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import ConfirmCodeForm from '../components/ConfirmCodeForm';
import * as localStorage from '../utils/localStorage';
import { AppContext } from '../store/AppContext';

const Home: React.FC = () => {
  const { user, dispatchUser } = useContext(AppContext);
  const storedUser = localStorage.getUser();

  return (
    <div style={{ height: 5000}}>
      <NavigationBar />
      {
        storedUser.emailVerified && (
          <h3>Welcome and be Happy!</h3>
        )
      }
      {
        !storedUser.emailVerified && (
          <ConfirmCodeForm user={user} dispatchUser={dispatchUser} />
        )
      }
    </div>
  );
}

export default Home;
