import { mainApi } from "./index";

const comboApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addDine: builder.mutation({
      query: (data) => ({
        url: "/dine/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["dine"] : null),
    }),

    updateDine: builder.mutation({
      query: (data) => ({
        url: "/dine/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["dine"] : null),
    }),

    bookDine: builder.mutation({
      query: (data) => ({
        url: "/dine/bookDine",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["dine"] : null),
    }),

    deleteDine: builder.mutation({
      query: (data) => ({
        url: "/dine/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["dine"] : null),
    }),

    getAllDines: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/dine?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["dine"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddDineMutation,
  useUpdateDineMutation,
  useBookDineMutation,
  useDeleteDineMutation,
  useGetAllDinesQuery,
} = comboApi;
