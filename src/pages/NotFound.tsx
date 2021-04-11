import React from 'react';
import NavigationBar from '../components/NavigationBar';
import * as styles from '../styles';

const NotFound: React.FC = () => {
  return (
    <div>
      <NavigationBar />
      <div style={styles.centeredPainel}>
        404 Not Found
      </div>
    </div>
  );
};

export default NotFound;
