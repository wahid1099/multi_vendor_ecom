import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string; // First image of the product
  discount: number; // Discount percentage for the product
  inventory: number; // Stock limit
  quantity: number;
  shopId: string;
};

// Extend CartItem for the addToCart payload to include userId
type AddToCartPayload = CartItem & {
  userId: string | null;
};

type CartState = {
  items: CartItem[];
  shopId: string | null;
  totalPrice: number;
  appliedCoupon: { code: string; discount: number } | null; // Coupon details
  userId: string | null; // Store the user ID
};

// Load cart from localStorage if it exists
const loadCartFromStorage = (): CartState => {
  const savedCart = localStorage.getItem("cart");
  return savedCart
    ? JSON.parse(savedCart)
    : {
        items: [],
        shopId: null,
        totalPrice: 0,
        appliedCoupon: null,
        userId: null,
      };
};

const initialState: CartState = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    // Add or update product in cart
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { shopId, id, quantity, inventory, userId } = action.payload;
      state.userId = userId;
      console.log(state.userId);

      // Check for vendor mismatch
      if (state.shopId && state.shopId !== shopId) {
        throw new Error("Products from different vendors cannot be added.");
      }

      // Add new vendor if cart is empty
      if (!state.shopId) {
        state.shopId = shopId;
      }

      // Check if product exists in cart
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        // Prevent exceeding inventory
        if (existingItem.quantity + quantity > inventory) {
          throw new Error("Cannot exceed available inventory.");
        }
        existingItem.quantity += quantity;
      } else {
        // Omit userId when adding to items array since it's not part of CartItem type
        const { userId, ...cartItem } = action.payload;
        state.userId = userId; // Set userId

        state.items.push({
          ...cartItem,
          quantity: Math.min(quantity, inventory),
        });
      }

      // Update total price
      state.totalPrice = state.items.reduce(
        (total, item) =>
          total + item.price * item.quantity * (1 - item.discount / 100),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart
    },

    // Replace the cart entirely
    replaceCart: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      state.shopId = action.payload[0]?.shopId || null;
      state.totalPrice = state.items.reduce(
        (total, item) =>
          total + item.price * item.quantity * (1 - item.discount / 100),
        0
      );

      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart
    },

    // Remove a product from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (state.items.length === 0) {
        state.shopId = null;
        state.totalPrice = 0;
      } else {
        state.totalPrice = state.items.reduce(
          (total, item) =>
            total + item.price * item.quantity * (1 - item.discount / 100),
          0
        );
      }

      localStorage.setItem("cart", JSON.stringify(state)); // Update localStorage
    },

    // Adjust product quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;

      const product = state.items.find((item) => item.id === id);
      if (product) {
        if (quantity > product.inventory) {
          throw new Error("Cannot exceed available inventory.");
        }
        product.quantity = quantity;

        // Recalculate total price
        state.totalPrice = state.items.reduce(
          (total, item) =>
            total + item.price * item.quantity * (1 - item.discount / 100),
          0
        );
      }
    },

    // Apply coupon (from backend)
    applyCoupon: (
      state,
      action: PayloadAction<{ code: string; discount: number }>
    ) => {
      const { discount } = action.payload;

      // Validate coupon discount (should not exceed product-level discount logic)
      const totalBeforeCoupon = state.items.reduce(
        (total, item) =>
          total + item.price * item.quantity * (1 - item.discount / 100),
        0
      );
      const discountAmount = (totalBeforeCoupon * discount) / 100;

      state.totalPrice = totalBeforeCoupon - discountAmount;
      state.appliedCoupon = action.payload;
    },

    // Clear the cart
    clearCart: (state) => {
      state.items = [];
      state.shopId = null;
      state.totalPrice = 0;
      state.appliedCoupon = null;
      state.userId = null; // Clear userId as well
      localStorage.setItem("cart", JSON.stringify(state)); // Save updated cart
    },
  },
});

export const {
  addToCart,
  replaceCart,
  removeFromCart,
  updateQuantity,
  applyCoupon,
  clearCart,
  setUserId,
} = cartSlice.actions;

export default cartSlice.reducer;
