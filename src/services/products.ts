import request from '../utils/request';
import * as localStorage from '../utils/localStorage';

const create = async (body: any): Promise<any> => {
  try {
    const response = await request.post('/products', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getUser().token}`,
      },
    });
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
    const response = await request.put(`/products/${body.id}`, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getUser().token}`,
      },
    });
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
    const response = await request.get('/products', {
      headers: {
        Authorization: `Bearer ${localStorage.getUser().token}`,
      },
    });
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

const getImages = async (id: number): Promise<any> => {
  try {
    const response = await request.get(`/products/${id}/images`, {
      headers: {
        Authorization: `Bearer ${localStorage.getUser().token}`,
      },
    });
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
  getImages,
  update,
};
