import { mainApi } from "./index";

const blogApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["blog"] : null),
    }),

    updateBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/update",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["blog"] : null),
    }),

    deleteBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["blog"] : null),
    }),

    getBlogWithDetails: builder.query({
      query: (_id) => `/blog/details/${_id}`,
      providesTags: ["blog"],
    }),

    getAllBlogs: builder.query({
      query: ({ pageNumber, pageSize }) =>
        `/blog?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      providesTags: ["blog"],
    }),

    getBlogByTagname: builder.query({
      query: (name) => `/blog/tag/${name}`,
    }),

    getTrendingBlog: builder.query({
      query: (size) => `/blog/trending?size=${size}`,
    }),

    addComment: builder.mutation({
      query: (data) => ({
        url: "/blog/comment",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["blog"] : null),
    }),

    addReact: builder.mutation({
      query: (data) => ({
        url: "/blog/react",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result) => (result ? ["blog"] : null),
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddBlogMutation,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
  useGetBlogWithDetailsQuery,
  useGetAllBlogsQuery,
  useAddCommentMutation,
  useAddReactMutation,
} = blogApi;
