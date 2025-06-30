import React from "react";
import Loader from "../../components/common/Loader.jsx";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderAdminMutation,
} from "../../api/orderApi";
import styles from "./OrdersTable.module.css";

/** next status for the “Mark …” button */
const next = {
  Processing: "Shipped",
  Shipped: "Delivered",
  Delivered: "Delivered",
};

export default function OrdersTable() {
  /* fetch list – default prevents “data is undefined” early crash */
  const {
    data = { orders: [] },
    isLoading,
    isError,
  } = useGetAllOrdersQuery();

  const [updateStatus] = useUpdateOrderStatusMutation();
  const [deleteOrder]  = useDeleteOrderAdminMutation();

  /* loading / error states */
  if (isLoading) return <Loader />;
  if (isError)   return <p style={{ textAlign:"center" }}>Could not load orders.</p>;

  /* running total */
  const total = data.orders.reduce((n, o) => n + o.totalPrice, 0);

  return (
    <div>
      <h1>
        Orders{" "}
        <small>(₹{total.toLocaleString()})</small>
      </h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>

        <tbody>
          {data.orders.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center" }}>
                No orders yet
              </td>
            </tr>
          ) : (
            data.orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6)}</td>
                <td>{o.user?.name || "—"}</td>
                <td align="right">₹{o.totalPrice}</td>
                <td>{o.orderStatus}</td>
                <td>
                  {o.orderStatus !== "Delivered" && (
                    <button
                      onClick={() =>
                        updateStatus({ id: o._id, status: next[o.orderStatus] })
                      }
                    >
                      Mark&nbsp;{next[o.orderStatus]}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      window.confirm("Delete order?") && deleteOrder(o._id)
                    }
                    style={{ marginLeft: 8 }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}