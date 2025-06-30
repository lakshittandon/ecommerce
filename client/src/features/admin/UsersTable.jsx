// src/features/admin/UsersTable.jsx
import React from "react";
import Loader from "../../components/common/Loader.jsx";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "../../api/userApi";
import styles from "./UsersTable.module.css";

export default function UsersTable() {
  const { data = { users: [] }, isLoading, isError } = useGetUsersQuery();
  const [updateRole] = useUpdateUserRoleMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) return <Loader />;
  if (isError) return <p style={{ textAlign: "center" }}>Could not load users.</p>;

  return (
    <div>
      <h1>Users</h1>
      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.users.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No users found.</td>
              </tr>
            ) : (
              data.users.map((u) => (
                <tr key={u._id}>
                  <td>{u._id.slice(-6)}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    {/* Only allow promoting non-admins; no demote for admins */}
                    {u.role !== "admin" && (
                      <button
                        onClick={() => updateRole({ id: u._id, role: "admin" })}
                      >
                        Promote
                      </button>
                    )}
                    {/* Allow deleting only non-admins */}
                    {u.role !== "admin" && (
                      <button
                        onClick={() => window.confirm("Delete user?") && deleteUser(u._id)}
                        style={{ marginLeft: 8 }}
                      >
                        🗑
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}