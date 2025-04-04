import { create } from "zustand";
import { toast } from "react-hot-toast";
import { persist, createJSONStorage } from "zustand/middleware";

interface CartItem {
  item: ProductType;
  quantity: number;
  color?: string;
  size?: string;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (_id: string, color?: string, size?: string) => void;
  increaseQuantity: (_id: string, color?: string, size?: string) => void;
  decreaseQuantity: (_id: string, color?: string, size?: string) => void;
  clearCart: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      cartItems: [],
      addItem: (data: CartItem) => {
        const { item, quantity, color, size } = data;
        const currentItems = get().cartItems; // all the items already in cart
        const isExisting = currentItems.find(
          (cartItem) =>
            cartItem.item._id === item._id &&
            cartItem.color === color &&
            cartItem.size === size
        );

        if (isExisting) {
          return toast("Item already in cart");
        }

        set({ cartItems: [...currentItems, { item, quantity, color, size }] });
        toast.success("Item added to cart");
      },
      removeItem: (_id: string, color?: string, size?: string) => {
        const newCartItems = get().cartItems.filter(
          (cartItem) =>
            cartItem.item._id !== _id ||
            cartItem.color !== color ||
            cartItem.size !== size
        );
        set({ cartItems: newCartItems });
        toast.success("Item removed from cart");
      },
      increaseQuantity: (_id: string, color?: string, size?: string) => {
        const newCartItems = get().cartItems.map((cartItem) => {
          if (
            cartItem.item._id === _id &&
            cartItem.color === color &&
            cartItem.size === size
          ) {
            return { ...cartItem, quantity: cartItem.quantity + 1 };
          }
          return cartItem;
        });
        set({ cartItems: newCartItems });
        toast.success("Quantity increased");
      },
      decreaseQuantity: (_id: string, color?: string, size?: string) => {
        const currentItems = get().cartItems;
        const newCartItems = currentItems.filter((cartItem) => {
          if (
            cartItem.item._id === _id &&
            cartItem.color === color &&
            cartItem.size === size
          ) {
            // If quantity is 1, remove the item
            if (cartItem.quantity <= 1) {
              return false;
            }
            // Otherwise, keep the item with decreased quantity
            cartItem.quantity -= 1;
          }
          return true;
        });
        set({ cartItems: newCartItems });
        toast.success("Quantity decreased");
      },
      clearCart: () => {
        set({ cartItems: [] });
        toast.success("Cart cleared");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
