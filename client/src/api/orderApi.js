import { baseApi } from "./baseApi";

/**
 * Order endpoints
 * - Normal user: create order, see own orders
 * - Admin: list all orders, update status, delete
 *
 * NOTE: Your Express routes treat `updateOrder` as a GET to
 * `/admin/orders/:id` with a JSON body: { status }
 * If you switch that route to PUT later, just change method here.
 */
export const orderApi = baseApi.injectEndpoints({
  tagTypes: ["Order"],
  endpoints: (build) => ({
    /* ─────────── Customer endpoints ─────────── */

    /** POST /order/new  { shippingInfo, orderItems, ... } */
    newOrder: build.mutation({
      query: (body) => ({
        url: "/order/new",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),

    /** GET /orders/me */
    getMyOrders: build.query({
      query: () => "/orders/me",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    /** GET /order/:id  (admin only in backend) */
    getOrderById: build.query({
      query: (id) => `/order/${id}`,
      providesTags: (_res, _err, id) => [{ type: "Order", id }],
    }),

    /* ─────────── Admin endpoints ─────────── */

    /** GET /admin/orders */
    getAllOrders: build.query({
      query: () => "/admin/orders",
      providesTags: [{ type: "Order", id: "LIST" }],
    }),

    /**
     * UPDATE status
     * Backend route uses GET (!) on /admin/orders/:id
     * We keep that verb; change to PUT/PATCH if you fix backend.
     */
    updateOrderStatus: build.mutation({
      query: ({ id, status }) => ({
        url: `/admin/orders/${id}`,
        method: "GET",
        body: { status }, // Express reads JSON even on GET
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "Order", id: arg.id },
        { type: "Order", id: "LIST" },
      ],
    }),

    /** DELETE /admin/orders/:id */
    deleteOrderAdmin: build.mutation({
      query: (id) => ({
        url: `/admin/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Order", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

/* ─────────── Export hooks ─────────── */
export const {
  useNewOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderAdminMutation,
} = orderApi;