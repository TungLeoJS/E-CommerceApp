import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    //Get all
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //Delete
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.splice(
        state.products.findIndex(
          (item) => item._id === action.payload.productId
        ),
        1
      );
    },
    deleteProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error('Can not delete product');
    },
    //Update product
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products[
        state.products.findIndex((x) => x._id === action.payload.productId)
      ] = { _id: action.payload.productId, ...action.payload.product };
      toast.success('Product updated');
    },
    updateProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error('Something went wrong...');
    },
    //Update product
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      toast.success('Add product successfully');
    },
    addProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      toast.error('Something went wrong...');
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
  addProductStart,
  addProductSuccess,
  addProductFailure,
} = productSlice.actions;
export default productSlice.reducer;
