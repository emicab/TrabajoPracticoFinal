import {
  useCallback,
  useMemo,
  useState,
} from "react";

import { CartContext } from "./cart-context";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = useCallback((product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...items, { ...product, quantity: 1 }];
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const value = useMemo(
    () => ({
      cartItems,
      totalUnidades: cartItems.reduce(
        (total, item) => total + item.quantity,
        0,
      ),
      addToCart,
      clearCart,
    }),
    [addToCart, cartItems, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
