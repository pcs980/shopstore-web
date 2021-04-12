import crypto from 'crypto-js';
import k from '../utils/constants';

const initialUser = {
  id: '',
  token: '',
};

const clear = () => {
  localStorage.clear();
};

const getUser = () => {
  let crypted = localStorage.getItem(k.USER_LOCAL_STORAGE);
  if (!crypted) {
    return JSON.stringify(initialUser);
  }
  const bytes = crypto.AES.decrypt(crypted, k.B64_SECRET);
  const user = JSON.parse(bytes.toString(crypto.enc.Utf8));
  return user;
};

const storeUser = (user: any) => {
  const crypted = crypto.AES.encrypt(JSON.stringify(user), k.B64_SECRET);
  localStorage.setItem(k.USER_LOCAL_STORAGE, crypted.toString());
};

export {
  clear,
  getUser,
  storeUser,
};
