import { mainApi } from "./index";

const authApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/am/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/am/login",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/am/changePass",
        method: "PATCH",
        body: data,
      }),
    }),

    updateAM: builder.mutation({
      query: (data) => ({
        url: "/am/update",
        method: "PATCH",
        body: data,
      }),
    }),

    deleteAM: builder.mutation({
      query: (data) => ({
        url: "/am/delete",
        method: "DELETE",
        body: data,
      }),
    }),

    getAM: builder.query({
      query: (_id) => `/am/${_id}`,
    }),

    getAllAM: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/am?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    }),

    searchAM: builder.query({
      query: ({ contactNo, name, email }) =>
        `/am/search/query?contactNo=${contactNo}&name=${name}&email=${email}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateAMMutation,
  useDeleteAMMutation,
  useGetAMQuery,
  useGetAllAMQuery,
  useSearchAMQuery,
} = authApi;
