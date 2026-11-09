import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Layout from "./Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import MenuDetail from "./pages/MenuDetail";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

import type { Menu as MenuType } from "./data/products";

import "./App.css";

type CartItemData = MenuType & {
  quantity: number;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState<CartItemData[]>([]);

  const activePage =
    location.pathname === "/"
      ? "home"
      : location.pathname.startsWith("/menu")
        ? "canteens"
        : location.pathname === "/cart"
          ? "cart"
          : "home";

  const handleNavigate = (page: string) => {
    const routes: Record<string, string> = {
      home: "/",
      canteens: "/menu",
      cart: "/cart",
      favorites: "/favorites",
      orders: "/history",
    };

    if (routes[page]) {
      navigate(routes[page]);
    }
  };

  const addToCart = (product: MenuType) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stok) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (product.stok <= 0) {
        return currentCart;
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const getQuantityInCart = (id: number) => {
    return cart.find((item) => item.id === id)?.quantity ?? 0;
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.min(quantity, item.stok),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (id: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  return (
    <Layout
      activePage={activePage}
      onNavigate={handleNavigate}
      onSearch={() => {}}
    >
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<Menu getQuantityInCart={getQuantityInCart} />}
        />

        <Route
          path="/menu/:id"
          element={
            <MenuDetail
              onAddToCart={addToCart}
              quantityInCart={getQuantityInCart}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              onUpdateQuantity={updateCartQuantity}
              onRemoveItem={removeCartItem}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
