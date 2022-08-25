import { mainApi } from "./index";

const consumerApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    conRegister: builder.mutation({
      query: (data) => ({
        url: "/consumer/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["consumer"] : null),
    }),

    conLogin: builder.mutation({
      query: (data) => ({
        url: "/consumer/login",
        method: "POST",
        body: data,
      }),
    }),

    conChangePassword: builder.mutation({
      query: (data) => ({
        url: "/consumer/changePass",
        method: "PATCH",
        body: data,
      }),
    }),

    updateConsumer: builder.mutation({
      query: (data) => ({
        url: "/consumer/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["consumer"] : null),
    }),

    deleteConsumer: builder.mutation({
      query: (data) => ({
        url: "/consumer/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["consumer"] : null),
    }),

    getConsumer: builder.query({
      query: (_id) => `/consumer/${_id}`,
    }),

    getAllConsumer: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/consumer?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["consumer"],
    }),

    searchConsumer: builder.query({
      query: ({ contactNo, name, email }) =>
        `/consumer/search/query?contactNo=${contactNo}&name=${name}&email=${email}`,
      providesTags: ["consumer"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useConRegisterMutation,
  useConLoginMutation,
  useConChangePasswordMutation,
  useUpdateConsumerMutation,
  useDeleteConsumerMutation,
  useGetConsumerQuery,
  useGetAllConsumerQuery,
  useSearchConsumerQuery,
} = consumerApi;
