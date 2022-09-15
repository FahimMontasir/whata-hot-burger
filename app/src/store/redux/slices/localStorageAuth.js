import jwtDecode from 'jwt-decode';
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

const localStorageAuthSlice = createSlice({
  name: 'localStorageAuth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
    },
    logout: state => {
      state.token = null;
    },
  },
});
export const getToken = state => state.localStorageAuth.token;
export const getUser = state => {
  try {
    return jwtDecode(state.localStorageAuth.token);
  } catch (error) {
    return error;
  }
};

export const {login, logout} = localStorageAuthSlice.actions;
export default localStorageAuthSlice.reducer;
