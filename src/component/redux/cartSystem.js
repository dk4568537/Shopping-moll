import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  quantity: 0,
};

const cartSystem = createSlice({
  name: "user",
  initialState,
  reducers: {
    Addcart: (state, action) => {
      const find = state.carts.findIndex(
        ({ product }) => product.id === action.payload.id
      );
      if (find >= 0) {
        state.carts[find].quantity += 1;
      } else {
        const tempvar = { ...action.payload, quantity: 1 };
        state.carts.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.carts = state.carts.filter(({ product }) => product.id !== id);
    },
    updateCartItems: (state, action) => {
      state.carts = action.payload;
    },
    clearCartItems: (state, action) => {
      state.carts = action.payload;
    },
  },
});
export const { Addcart, removeFromCart, updateCartItems, clearCartItems } = cartSystem.actions;
export default cartSystem.reducer;
