import React from "react";
import Loader from "../../components/common/Loader.jsx";
import {
  useGetUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} from "../../api/userApi";
import styles from "./UsersTable.module.css";

export default function UsersTable() {
  const { data, isLoading } = useGetUsersQuery();
  const [updateRole]  = useUpdateUserRoleMutation();
  const [deleteUser]  = useDeleteUserMutation();

  if (isLoading) return <Loader />;

  return (
    <div>
      <h1>Users</h1>
      <table className={styles.table}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th/></tr>
        </thead>
        <tbody>
          {data.users.map(u => (
            <tr key={u._id}>
              <td>{u._id.slice(-6)}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button onClick={() => updateRole({ id: u._id, role: u.role === "admin" ? "user" : "admin" })}>
                  {u.role === "admin" ? "Demote" : "Promote"}
                </button>
                {u.role !== "admin" && (
                  <button onClick={() => confirm("Delete user?") && deleteUser(u._id)}>🗑</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}