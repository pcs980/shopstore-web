import { createContext, Dispatch, useReducer } from 'react';
import UserReducer, { initialUser, UserAction, UserState } from './UserReducer';

interface AppState {
  user: UserState;
  setUser: Dispatch<UserAction>;
}

export const AppContext = createContext<AppState>({
  user: initialUser,
  setUser: () => {}
});

const AppProvider: React.FC = ({ children }) => {
  const [user, setUser] = useReducer(UserReducer, initialUser);

  return (
    <AppContext.Provider value={{
      user,
      setUser,
    }}>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;