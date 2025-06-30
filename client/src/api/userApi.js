import { baseApi } from "./baseApi";

/**
 * Admin-only endpoints for managing users.
 * All requests automatically carry the `token` cookie because
 * fetchBaseQuery in baseApi has `credentials: "include"`.
 */
export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    /** GET /admin/users  →  returns array of users */
    getUsers: build.query({
      query: () => "/admin/users",
      providesTags: (res) =>
        res?.users
          ? [
              ...res.users.map(({ _id }) => ({ type: "User", id: _id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    /** GET /admin/users/:id  →  fetch single user (optional helper) */
    getUserById: build.query({
      query: (id) => `/admin/users/${id}`,
      providesTags: (_res, _err, id) => [{ type: "User", id }],
    }),

    /** PUT /admin/users/:id  →  change name / email / role */
    updateUser: build.mutation({
      query: ({ id, ...body }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "User", id: arg.id },
        { type: "User", id: "LIST" },
      ],
    }),

    /** Convenience: just update role */
    updateUserRole: build.mutation({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: (_res, _err, arg) => [
        { type: "User", id: arg.id },
        { type: "User", id: "LIST" },
      ],
    }),

    /** DELETE /admin/users/:id */
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});

/* ───────── Export hooks ───────── */
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
} = userApi;