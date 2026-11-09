import { Link } from "react-router-dom";

import { rupiah } from "../data/products";
import type { Menu } from "../data/products";

type CartItemData = Menu & {
  quantity: number;
};

type CartProps = {
  cart: CartItemData[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
};

function Cart({ cart, onUpdateQuantity, onRemoveItem }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.harga * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <section className="cart-page">
        <div className="cart-empty">
          <h1>Keranjang Kamu Kosong</h1>
          <p>Yuk, pilih makanan dan minuman favoritmu!</p>

          <Link to="/menu" className="back-button">
            Jelajahi Menu
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="section-heading">
        <span className="section-label">KANTINKU</span>
        <h1>Keranjang Belanja</h1>
        <p>Periksa kembali pesananmu sebelum membayar.</p>
      </div>

      <div className="cart-layout">
        <div className="cart-list">
          {cart.map((item) => (
            <article className="cart-product" key={item.id}>
              <div className="cart-product-info">
                <Link to={`/menu/${item.id}`} className="cart-product-link">
                  <h3>{item.nama}</h3>
                </Link>

                <p>{item.kategori}</p>
                <strong>{rupiah(item.harga)}</strong>
              </div>

              <div className="cart-product-actions">
                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    type="button"
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.stok}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="remove-cart-button"
                  onClick={() => onRemoveItem(item.id)}
                >
                  Hapus
                </button>
              </div>

              <div className="cart-subtotal">
                {rupiah(item.harga * item.quantity)}
              </div>
            </article>
          ))}
        </div>

        <aside className="cart-summary">
          <h2>Ringkasan Pesanan</h2>

          <div className="cart-summary-row">
            <span>Total Item</span>
            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
          </div>

          <div className="cart-summary-row cart-total">
            <strong>Total Pembayaran</strong>
            <strong>{rupiah(total)}</strong>
          </div>

          <Link to="/menu" className="continue-shopping">
            + Tambah Menu Lain
          </Link>

          <Link to="/checkout" className="checkout-button">
            Lanjut ke Pembayaran
          </Link>
        </aside>
      </div>
    </section>
  );
}

export default Cart;
