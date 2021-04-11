import { createContext, Dispatch, useReducer } from 'react';
import productReducer, { initialProductState, ProductAction, ProductState } from './ProductReducer';
import UserReducer, { initialUserState, UserAction, UserState } from './UserReducer';

interface AppState {
  user: UserState;
  dispatchUser: Dispatch<UserAction>;
  product: ProductState;
  dispatchProduct: Dispatch<ProductAction>;
}

export const AppContext = createContext<AppState>({
  user: initialUserState,
  dispatchUser: () => {},
  product: initialProductState,
  dispatchProduct: () => {},
});

const AppProvider: React.FC = ({ children }) => {
  const [user, dispatchUser] = useReducer(UserReducer, initialUserState);
  const [product, dispatchProduct] = useReducer(productReducer, initialProductState);

  return (
    <AppContext.Provider value={{
      user,
      dispatchUser,
      product,
      dispatchProduct,
    }}>
      { children }
    </AppContext.Provider>
  );
};

export default AppProvider;