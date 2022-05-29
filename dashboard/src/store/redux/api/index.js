import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "http://localhost:5000";

export const mainApi = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      if (getState().localStorageAuth) {
        const { token } = getState().localStorageAuth;
        headers.set("x-auth-token", token);
      }

      return headers;
    },
  }),
  tagTypes: ["demo"],
  keepUnusedDataFor: 1200,
  endpoints: () => ({}),
});
