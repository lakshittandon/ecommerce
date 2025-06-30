import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";          // ← holds products, orders, users, auth endpoints
import cartReducer from "../features/cart/cartSlice.js";
import authReducer from "../features/auth/authSlice";

/**
 * Because `orderApi`, `userApi`, etc. were all created via
 * baseApi.injectEndpoints(...), they *share the same* reducerPath
 * (`"api"`) and middleware.  We only register them once.
 */
const store = configureStore({
  reducer: {
    // RTK-Query slice (products + orders + users, etc.)
    [baseApi.reducerPath]: baseApi.reducer,

    // Local feature slices
    cart: cartReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;