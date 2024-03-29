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

    deleteAllCart: builder.mutation({
      query: () => ({
        url: "/cart/deleteAll",
        method: "DELETE",
      }),
      invalidatesTags: (result) => (result ? ["cart"] : null),
    }),

    getCart: builder.query({
      query: (userId) => `/cart/${userId}`,
      providesTags: ["cart"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddComboCartMutation,
  useAddFoodCartMutation,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteAllCartMutation,
  useGetCartQuery,
} = cartApi;
