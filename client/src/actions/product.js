import axios from 'axios'
import { setAlert } from './alert';
import {GET_PRODUCTS,PRODUCT_ERROR,ADD_PRODUCT, REMOVE_PRODUCT, CLEAR_PRODUCT, GET_PRODUCT} from './types'

//* Add Product
export const addProduct = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const res = await axios.post('/api/product',formData,config)
    dispatch({
      type:ADD_PRODUCT,
      payload:res.data
    });
    dispatch(setAlert('Product Added','success'));
    // history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Get products
export const getProducts = () => async dispatch =>{
  dispatch({ type: CLEAR_PRODUCT });
  try {
    const res = await axios.get('/api/product');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Get product by ID
export const getProductByID = (id) => async dispatch =>{
  try {
    const res = await axios.get(`/api/product/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//* Delete product
export const deleteProduct = (productId) => async dispatch =>{
  try {
    await axios.delete(`/api/product/delete/${productId}`);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: productId
    })
    dispatch(setAlert('Product Removed','danger'));
  } catch (err) {
    dispatch({
      type: PRODUCT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}