import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/v1", // 🔧 adjust if backend URL differs
    credentials: "include", // send cookies automatically
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}), // extended in other files
});