import { mainApi } from "./index";

const cartApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addComboCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["cart"] : null),
    }),

    addFoodCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add/singleFood",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["cart"] : null),
    }),

    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["cart"] : null),
    }),

    deleteCart: builder.mutation({
      query: (data) => ({
        url: "/cart/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["cart"] : null),
    }),

    getCart: builder.query({
      query: (userId) => `/cart/${userId}`,
    }),
    getUserHasCart: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/cart/user/hasCart?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddComboCartMutation,
  useAddFoodCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useGetCartQuery,
  useGetUserHasCartQuery,
} = cartApi;
