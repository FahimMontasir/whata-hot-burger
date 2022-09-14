import {mainApi} from './index';

const foodApi = mainApi.injectEndpoints({
  endpoints: builder => ({
    addFood: builder.mutation({
      query: data => ({
        url: '/product/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: result => (result ? ['food'] : null),
    }),

    updateFood: builder.mutation({
      query: data => ({
        url: '/product/update',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: result => (result ? ['food'] : null),
    }),

    deleteFood: builder.mutation({
      query: data => ({
        url: '/product/delete',
        method: 'DELETE',
        body: data,
      }),
      invalidatesTags: result => (result ? ['food'] : null),
    }),

    getFood: builder.query({
      query: _id => `/product/${_id}`,
    }),

    getOutOfStockFood: builder.query({
      query: () => '/product/out/ofStock',
    }),

    getFoodByCategory: builder.query({
      query: category => `/product/?category=${category}`,
      providesTags: ['food'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useAddFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
  useGetFoodQuery,
  useGetOutOfStockFoodQuery,
  useGetFoodByCategoryQuery,
} = foodApi;
