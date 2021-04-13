import React, { useContext } from 'react';
import NavigationBar from '../components/NavigationBar';
import ConfirmCodeForm from '../components/ConfirmCodeForm';
import { AppContext } from '../store/AppContext';
import * as localStorage from '../utils/localStorage';
import * as styles from '../styles';
import { UserState } from '../store/UserReducer';

interface WelcomeHomeProps {
  user: UserState;
}

const WelcomeHome: React.FC<WelcomeHomeProps> = ({ user }) => {
  return (
    <div style={styles.centeredPainel}>
      <h3>{`Welcome, ${user.name}`}</h3>
    </div>
  );
};

const Home: React.FC = () => {
  const { dispatchUser } = useContext(AppContext);
  const storedUser = localStorage.getUser();
  console.log(storedUser);

  return (
    <div style={{ height: 5000}}>
      <NavigationBar />
      {
        !storedUser.emailVerified && (
          <ConfirmCodeForm user={storedUser} dispatchUser={dispatchUser} />
        )
      }
      {
        storedUser.emailVerified && (
          <WelcomeHome user={storedUser} />
        )
      }
    </div>
  );
}

export default Home;
