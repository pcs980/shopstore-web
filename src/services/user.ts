import request from '../utils/request';

const confirmCode = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/users/confirm', body);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      return error.response.data;
    }
    return {
      error: `${error.response.statusText} (${error.response.status})`,
    }
  }
};

const signin = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/signin', body);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      return error.response.data;
    }
    return {
      error: `${error.response.statusText} (${error.response.status})`,
    }
  }
};

const signup = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/signup', body);
    return response.data;
  } catch (error) {
    if (error.response?.data?.error) {
      return error.response.data;
    }
    return {
      error: `${error.response.statusText} (${error.response.status})`,
    }
  }
};

export {
  confirmCode,
  signin,
  signup,
};
