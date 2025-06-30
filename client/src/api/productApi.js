import { baseApi } from "./baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ───────────────────────────────────
    // Public queries
    // ───────────────────────────────────
    getProducts: build.query({
      query: (params) => ({ url: "/products", params }),
      providesTags: (res) =>
        res?.products
          ? [
              ...res.products.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProduct: build.query({
      query: (id) => `/product/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Product", id }],
    }),

    // ───────────────────────────────────
    // Admin mutations
    // ───────────────────────────────────
    createProduct: build.mutation({
      query: (body) => ({
        url: "/admin/product/new",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    updateProduct: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/product/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [{ type: "Product", id: arg.id }],
    }),

    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/admin/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
      // Create or update a product review
    createReview: build.mutation({
      query: ({ rating, comment, productId }) => ({
        url: "/review",
        method: "PUT",
        body: { rating, comment, productId },
      }),
      invalidatesTags: (res, err, arg) => [
        { type: "Product", id: arg.productId },
      ],
    }),

    // Get all reviews for a product
    getProductReviews: build.query({
      query: (id) => `/reviews?id=${id}`,
    }),
  }),
  overrideExisting: false,
});


export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductReviewsQuery,
  useCreateReviewMutation,

} = productApi;