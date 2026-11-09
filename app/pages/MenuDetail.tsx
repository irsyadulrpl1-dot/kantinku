import { Link, useNavigate, useParams } from "react-router-dom";

import { menu, rupiah } from "../data/products";
import type { Menu as MenuType } from "../data/products";

type MenuDetailProps = {
  onAddToCart: (product: MenuType) => void;
  quantityInCart: (id: number) => number;
};

function MenuDetail({ onAddToCart, quantityInCart }: MenuDetailProps) {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = menu.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <section className="not-found-page">
        <h1>404</h1>
        <h2>Menu tidak ditemukan</h2>
        <p>Menu yang kamu cari tidak tersedia.</p>

        <Link to="/menu" className="back-button">
          Kembali ke Katalog
        </Link>
      </section>
    );
  }

  const remainingStock = product.stok - quantityInCart(product.id);

  const isOutOfStock = remainingStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    onAddToCart(product);
    navigate("/cart");
  };

  return (
    <section className="menu-detail-page">
      <Link to="/menu" className="back-link">
        ← Kembali ke Katalog
      </Link>

      <div className="menu-detail-content">
        <div className="menu-detail-info">
          <span className="section-label">DETAIL MENU</span>

          <h1>{product.nama}</h1>

          <p className="detail-category">Kategori: {product.kategori}</p>

          <h2>{rupiah(product.harga)}</h2>

          <div className="detail-stock">
            {isOutOfStock ? (
              <span className="stock-empty">Habis</span>
            ) : (
              <span>Stok tersedia: {remainingStock}</span>
            )}
          </div>

          <button
            type="button"
            className="detail-cart-button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {isOutOfStock ? "Stok Habis" : "Tambah ke Keranjang"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MenuDetail;
