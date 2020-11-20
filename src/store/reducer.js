import {SET_USER, SET_ACCESS_TOKEN, SET_LOADING, SET_TOAST} from './actions';

export const user = (state = null, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER:
      return payload;

    default:
      return state;
  }
};

export const accessToken = (state = null, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_ACCESS_TOKEN:
      return payload;

    default:
      return state;
  }
};

export const loading = (state = false, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_LOADING:
      return payload;

    default:
      return state;
  }
};

export const toast = (state = null, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_TOAST:
      return payload;

    default:
      return state;
  }
};
