import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from '../constants/orderConstant';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  // getstate untuk dapat userinfo
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    // Akses ke userinfo
    const {
      userLogin: { userInfo },
    } = getState();

    // sent data to headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  // getstate untuk dapat userinfo
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    // Akses ke userinfo
    const {
      userLogin: { userInfo },
    } = getState();

    // sent data to headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState,
) => {
  // getstate untuk dapat userinfo
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    // Akses ke userinfo
    const {
      userLogin: { userInfo },
    } = getState();

    // sent data to headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config,
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};

export const listMyOrder = () => async (dispatch, getState) => {
  // getstate untuk dapat userinfo
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    });

    // Akses ke userinfo
    const {
      userLogin: { userInfo },
    } = getState();

    // sent data to headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.msg
          ? error.response.data.msg
          : error.msg,
    });
  }
};
