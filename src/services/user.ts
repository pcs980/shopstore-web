import request from '../utils/request';

const signin = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/signin', body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

const signup = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/signup', body);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  signin,
  signup,
};
