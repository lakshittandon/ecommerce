import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";   // your styles

export default function AdminLayout() {
  return (
    <div className="admin-shell">
      <aside>
        <h2>Admin</h2>

        <NavLink to="/admin/products">Products</NavLink><br></br>
        <NavLink to="/admin/users">Users</NavLink><br></br>
        <NavLink to="/admin/orders">Orders</NavLink>
      </aside>

      <section className="admin-main">
        <Outlet />   {/* nested routes render here */}
      </section>
    </div>
  );
}