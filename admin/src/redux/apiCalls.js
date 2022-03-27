import { loginFailure, loginStart, loginSuccess } from './userRedux';
import { publicRequest, userRequest } from './requestMethod';
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from './productRexdux';

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post('/auth/login', user);
    if (res && res.data) {
      dispatch(loginSuccess(res.data));
      return {
        status: res.status
      }
    }
  } catch (err) {
    dispatch(loginFailure());
    return {
      status: err.status,
      message: err.message
    }
  }
};

export const getProduct = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get('/products');
    if (res && res.data) {
      dispatch(getProductSuccess(res.data));
    }
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (dispatch, productId) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${productId}`);
    if (res && res.data) {
      dispatch(deleteProductSuccess(productId));
      return {
        status: res.status,
        message: res?.message
      }
    }
    
  } catch (err) {
    dispatch(deleteProductFailure());
    return {
      status: err.status,
      message: err.message
    }
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post('/products', product);
    if (res && res.data) {
      dispatch(addProductSuccess(res?.data));
      return {
        status: res.status,
        message: res?.message
      }
    }
  } catch (err) {
    dispatch(addProductFailure());
    return {
      status: err.status,
      message: err.message
    }
  }
};

export const updateProduct = async (dispatch, product, productId) => {
  dispatch(updateProductStart());
  try {
    const res = await userRequest.put(`/products/${productId}`, product);
    if (res && res.data) {
      dispatch(updateProductSuccess({ productId, product }));
      return {
        status: res.status,
        message: res?.message
      }
    }
  } catch (err) {
    dispatch(updateProductFailure());
    return {
      status: err.status,
      message: err.message
    }
  }
};
