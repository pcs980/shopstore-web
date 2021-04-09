export interface UserState {
  authenticated?: boolean;
  name: string;
  email: string;
  token: string;
};

export interface UserAction extends UserState {
  type: string;
}

const userReducer = (state: UserState, action: UserAction): UserState => {
  console.log('user reducer ->', action);
  switch (action.type) {
    case 'SIGNIN':
      return {
        ...state,
        authenticated: true,
        name: action.name,
        token: action.token,
      };
    case 'SIGNOUT':
      return {
        ...state,
        authenticated: false,
        name: '',
        token: '',
      };
    default:
      return state;
  }
};

export const initialUser: UserState = {
  authenticated: false,
  name: '',
  email: '',
  token: '',
};

export default userReducer;
