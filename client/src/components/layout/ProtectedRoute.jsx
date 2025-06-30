import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { useGetMeQuery } from "../../api/authApi";   // ← add

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuth, user } = useAppSelector((s) => s.auth);
  const location = useLocation();

  // this fires every time the guard is mounted
  const { isFetching } = useGetMeQuery();

  // ⬇️  block rendering until cookie check is done
  if (isFetching) return null;

  if (!isAuth)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (adminOnly && user?.role !== "admin")
    return <Navigate to="/" replace />;

  return children;
}