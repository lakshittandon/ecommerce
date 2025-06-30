import React from "react";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../api/orderApi";
import Loader from "../../components/common/Loader";

export default function OrdersPage() {
  const { data, isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <Loader />;
  if (error)
    return <p style={{ textAlign: "center" }}>Could not fetch orders.</p>;

  if (data.orders.length === 0)
    return (
      <main className="container" style={{ paddingTop: "2rem", textAlign: "center" }}>
        <h2>No orders yet</h2>
        <Link to="/">Shop now</Link>
      </main>
    );

  return (
    <main className="container" style={{ paddingTop: "2rem" }}>
      <h1>Your Orders</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="right">Items</th>
            <th align="right">Total (₹)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((o) => (
            <tr key={o._id} style={{ borderTop: "1px solid #ddd" }}>
              <td>{o._id.slice(-6)}</td>
              <td align="right">{o.orderItems.length}</td>
              <td align="right">{o.totalPrice.toLocaleString()}</td>
              <td>{o.orderStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}