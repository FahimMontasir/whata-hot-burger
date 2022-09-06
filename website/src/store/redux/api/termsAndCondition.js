import { mainApi } from "./index";

const termsConditionApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addTermsCondition: builder.mutation({
      query: (data) => ({
        url: "/termsCondition/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["termsCondition"] : null),
    }),

    updateTermsCondition: builder.mutation({
      query: (data) => ({
        url: "/termsCondition/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["termsCondition"] : null),
    }),

    getTermsCondition: builder.query({
      query: () => `/termsCondition`,
      providesTags: ["termsCondition"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddTermsConditionMutation,
  useUpdateTermsConditionMutation,
  useGetTermsConditionQuery,
} = termsConditionApi;
