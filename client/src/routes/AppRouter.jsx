import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import ProductsPage from "../features/products/ProductsPage";
import ProductDetailsPage from "../features/products/ProductDetailsPage";
import CartPage from "../features/cart/CartPage";
import CheckoutPage from "../features/checkout/CheckoutPage";
import OrdersPage from "../features/orders/OrdersPage";

import AdminLayout from "../features/admin/AdminLayout";
import DashboardPage from "../features/admin/DashboardPage";
import ProductsTable from "../features/admin/ProductsTable";
import UsersTable from "../features/admin/UsersTable";
import OrdersTable from "../features/admin/OrdersTable";

import ProtectedRoute from "../components/layout/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <CheckoutPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrdersPage />
    </ProtectedRoute>
  }
/>

      {/* -------- admin section -------- */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute adminOnly>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="products" element={<ProductsTable />} />
        <Route path="users" element={<UsersTable />} />
        <Route path="orders" element={<OrdersTable />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}