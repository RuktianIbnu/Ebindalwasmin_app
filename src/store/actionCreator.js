import {SET_ACCESS_TOKEN, SET_LOADING, SET_TOAST, SET_USER} from './actions';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setAccessToken = (payload) => ({
  type: SET_ACCESS_TOKEN,
  payload,
});

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setToast = (payload) => ({
  type: SET_TOAST,
  payload,
});
