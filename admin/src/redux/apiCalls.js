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
    }
  } catch (err) {
    dispatch(loginFailure());
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
      dispatch(deleteProductSuccess(res.data));
    }
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post('/products', { product });
    dispatch(addProductSuccess(res?.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const updateProduct = async (dispatch, productId, product) => {
  dispatch(updateProductStart());
  try {
    //   const res = await userRequest.post('/products', product);
    //   if (res && res.data) {
    dispatch(updateProductSuccess({ productId, product }));
    //   }
  } catch (err) {
    dispatch(updateProductFailure());
  }
};
