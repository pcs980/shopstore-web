import React from 'react';
import Lottie from 'lottie-react';
import NavigationBar from '../components/NavigationBar';
import underDevelopment from '../assets/animations/underDevelopment.json';
import * as styles from '../styles';

const CustomersHome: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <div style={styles.centeredPainel}>
        <Lottie animationData={underDevelopment} autoplay style={{ width: '40%', height: '40%'}} />
        No user stories here...
      </div>
    </div>
  );
};

export default CustomersHome;
