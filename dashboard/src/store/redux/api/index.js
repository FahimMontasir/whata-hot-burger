import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BASE_URL = "https://whb-backend.onrender.com";

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
  tagTypes: [
    "am",
    "consumer",
    "food",
    "combo",
    "invoice",
    "cart",
    "dine",
    "blog",
    "faq",
    "termsCondition",
  ],
  keepUnusedDataFor: 1200,
  endpoints: () => ({}),
});
