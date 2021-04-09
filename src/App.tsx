import React from 'react';
import Routes from './routes';
import AppProvider from './store/AppContext';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
}

export default App;
