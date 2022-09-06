import { mainApi } from "./index";

const invoiceApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["invoice"] : null),
    }),

    updateInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["invoice"] : null),
    }),

    deleteInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["invoice"] : null),
    }),

    getConsumerInvoices: builder.query({
      query: (_id) => `/invoice/${_id}`,
    }),

    getAllInvoices: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/invoice?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["invoice"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useGetConsumerInvoicesQuery,
  useGetAllInvoicesQuery,
} = invoiceApi;
