import { createContext, Dispatch, useReducer } from 'react';
import UserReducer, { initialUserState, UserAction, UserState } from './UserReducer';

interface AppState {
  user: UserState;
  setUser: Dispatch<UserAction>;
}

export const AppContext = createContext<AppState>({
  user: initialUserState,
  setUser: () => {}
});

const AppProvider: React.FC = ({ children }) => {
  const [user, setUser] = useReducer(UserReducer, initialUserState);

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