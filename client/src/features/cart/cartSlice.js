import { createSlice } from "@reduxjs/toolkit";
const initialState = { items: [] };
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (s, { payload }) => {
      const i = s.items.find((x) => x.productId === payload.productId);
      i ? (i.quantity += payload.quantity) : s.items.push(payload);
    },
    removeItem: (s, { payload }) => {
      s.items = s.items.filter((x) => x.productId !== payload);
    },
    setQuantity: (s, { payload }) => {
      const i = s.items.find((x) => x.productId === payload.productId);
      if (i) i.quantity = payload.quantity;
    },
    clearCart: (s) => { s.items = []; },
  },
});
export const { addItem, removeItem, setQuantity, clearCart } = slice.actions;
export default slice.reducer;