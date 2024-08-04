import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define CartItem and CartState interfaces
export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// Initial state of the cart
const initialState: CartState = {
  items: [],
};

// Create a slice for cart management
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

// Export actions and reducer
export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
