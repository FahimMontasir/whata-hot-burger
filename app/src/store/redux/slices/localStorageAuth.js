import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import {TOKEN_NAME} from '../middlewares/localStorage';

const initialState = {
  token: null,
};

const localStorageAuthSlice = createSlice({
  name: 'localStorageAuth',
  initialState,
  reducers: {
    login: async (state, action) => {
      state.token = action.payload.token;
      try {
        await AsyncStorage.setItem(TOKEN_NAME, state.token);
      } catch (error) {
        console.log(error);
      }
    },
    logout: async state => {
      state.token = null;
      try {
        await AsyncStorage.clear();
      } catch (error) {
        console.log(error);
      }
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
