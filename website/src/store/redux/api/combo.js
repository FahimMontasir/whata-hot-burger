import { mainApi } from "./index";

const comboApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addCombo: builder.mutation({
      query: (data) => ({
        url: "/combo/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["combo"] : null),
    }),

    updateCombo: builder.mutation({
      query: (data) => ({
        url: "/combo/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["combo"] : null),
    }),

    deleteCombo: builder.mutation({
      query: (data) => ({
        url: "/combo/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["combo"] : null),
    }),

    getCombo: builder.query({
      query: (_id) => `/combo/${_id}`,
    }),

    getComboByCategory: builder.query({
      query: (category) => `/combo/?category=${category}`,
      providesTags: ["combo"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddComboMutation,
  useUpdateComboMutation,
  useDeleteComboMutation,
  useGetComboQuery,
  useGetComboByCategoryQuery,
} = comboApi;
