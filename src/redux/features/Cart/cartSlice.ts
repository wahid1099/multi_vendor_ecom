// store/slices/cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  vendorId: string;
};

type CartState = {
  items: CartItem[];
  vendorId: string | null; // Tracks which vendor's products are in the cart
  totalPrice: number;
};

const initialState: CartState = {
  items: [],
  vendorId: null,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { vendorId } = action.payload;

      // Check if adding a product from a different vendor
      if (state.vendorId && state.vendorId !== vendorId) {
        throw new Error("vendorMismatch"); // This will be handled in the UI
      }

      // Add new vendor if the cart is empty
      if (!state.vendorId) {
        state.vendorId = vendorId;
      }

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      // Update total price
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    replaceCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.vendorId = action.payload[0]?.vendorId || null;
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      // Update total price and vendorId if the cart is empty
      if (state.items.length === 0) {
        state.vendorId = null;
        state.totalPrice = 0;
      } else {
        state.totalPrice = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },

    applyCoupon: (state, action: PayloadAction<number>) => {
      // Action payload is the discount percentage (e.g., 10 for 10%)
      const discount = (state.totalPrice * action.payload) / 100;
      state.totalPrice -= discount;
    },

    clearCart: (state) => {
      state.items = [];
      state.vendorId = null;
      state.totalPrice = 0;
    },
  },
});

export const {
  addToCart,
  replaceCart,
  removeFromCart,
  applyCoupon,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
