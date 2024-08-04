import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Replace with your production URL
const BASE_URL = 'https://ecommerce-store.vercel.app/api';

// Create API slice for fetching products using the production backend
const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

// Export hooks for the queries
export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
export default productApi;
