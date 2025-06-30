import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api/v1",
    credentials: "include", // send cookies automatically
  }),
  tagTypes: ["Product", "Order", "User"],
  endpoints: () => ({}), // extended in other files
});