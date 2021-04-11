import request from '../utils/request';

const create = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/products', body);
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

const update = async (body: any): Promise<any> => {
  try {
    const response = await request.put(`/products/${body.id}`, body);
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

const get = async (): Promise<any> => {
  try {
    const response = await request.get('/products');
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
  create,
  get,
  update,
};
