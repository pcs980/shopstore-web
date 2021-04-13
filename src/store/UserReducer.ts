import * as localStorage from "../utils/localStorage";

export interface UserState {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  registeredAt?: Date;
  token: string;
};

export interface UserAction {
  type: string;
  data: UserState;
}

export const initialUserState: UserState = {
  id: 0,
  name: '',
  email: '',
  emailVerified: false,
  token: '',
};

export const confirmCodeAction = (): UserAction => ({
  type: 'CONFIRM_CODE',
  data: {
    ...initialUserState,
    emailVerified: true,
  },
});

const userReducer = (state: UserState, action: UserAction): UserState => {
  console.log('user reducer ->', action);
  switch (action.type) {
    case 'CONFIRM_CODE':
      const user: UserState = {
        ...state,
        emailVerified: true,
      };
      localStorage.storeUser(user);
      return user;
    case 'SIGNIN':
      localStorage.storeUser(action.data);
      return {
        ...state,
        id: action.data.id,
        name: action.data.name,
        email: action.data.email,
        emailVerified: action.data.emailVerified,
        token: action.data.token,
      };
    case 'SIGNOUT':
      localStorage.storeUser(initialUserState);
      return {
        ...initialUserState,
      };
    default:
      return state;
  }
};

export default userReducer;
