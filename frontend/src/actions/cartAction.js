import axios from 'axios';
import { CART_ADD_ITEM } from '../constants/cartConstant';

// Tersimpan di localstorage
export const addToCart = (id, qty) => async (dispacth, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispacth({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // simpan ke localstorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};