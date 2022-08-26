import { mainApi } from "./index";

const faqApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    askQuestion: builder.mutation({
      query: (data) => ({
        url: "/faq/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["faq"] : null),
    }),

    answerQuestion: builder.mutation({
      query: (data) => ({
        url: "/faq/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["faq"] : null),
    }),

    deleteFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["faq"] : null),
    }),

    getAllFaq: builder.query({
      query: () => `/faq`,
      providesTags: ["faq"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAskQuestionMutation,
  useAnswerQuestionMutation,
  useDeleteFaqMutation,
  useGetAllFaqQuery,
} = faqApi;
