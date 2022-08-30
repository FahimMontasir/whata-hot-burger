import jwtDecode from "jwt-decode";
import { createSlice } from "@reduxjs/toolkit";
import { TOKEN_NAME } from "../middlewares/localStorage";

const initialState = {
  token: null,
};

const localStorageAuthSlice = createSlice({
  name: "localStorageAuth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem(TOKEN_NAME, state.token);
    },
    logout: (state) => {
      state.token = null;
      localStorage.clear();
    },
  },
});
export const getToken = (state) => state.localStorageAuth.token;
export const getUser = (state) => jwtDecode(state.localStorageAuth.token);

export const { login, logout } = localStorageAuthSlice.actions;
export default localStorageAuthSlice.reducer;
