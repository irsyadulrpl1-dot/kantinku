import { Link } from "react-router-dom";
import type { Menu } from "../data/products";
import { rupiah } from "../data/products";

type ProductCardProps = {
  product: Menu;
  image: string;
  seller: string;
  quantityInCart: number;
};

function ProductCard({
  product,
  image,
  seller,
  quantityInCart,
}: ProductCardProps) {
  const remainingStock = product.stok - quantityInCart;

  return (
    <Link to={`/menu/${product.id}`} className="product-card-link">
      <article className="product-card">
        <div className="product-image">
          {image && <img src={image} alt={product.nama} />}

          {remainingStock <= 0 && <span className="product-tag">Habis</span>}
        </div>

        <div className="product-info">
          <div className="product-seller">{seller}</div>

          <h3>{product.nama}</h3>

          <div className="product-rating">
            <span>Stok: {remainingStock}</span>
            <span className="rating-divider">·</span>
            {product.kategori}
          </div>

          <div className="product-footer">
            <strong>{rupiah(product.harga)}</strong>

            <span className="detail-product-button">Lihat Detail →</span>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
