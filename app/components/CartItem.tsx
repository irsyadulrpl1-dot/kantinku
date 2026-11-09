import type { Menu } from "../data/products";
import { rupiah } from "../data/products";

type CartItemData = Menu & {
  quantity: number;
};

type CartItemProps = {
  item: CartItemData;
  onIncrease: (item: CartItemData) => void;
  onDecrease: (item: CartItemData) => void;
  onRemove: (id: number) => void;
};

function CartItem({ item, onIncrease, onDecrease, onRemove }: CartItemProps) {
  return (
    <article className="cart-item">
      <div className="cart-item-info">
        <h3>{item.nama}</h3>
        <p>{item.kategori}</p>
        <strong>{rupiah(item.harga)}</strong>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-control">
          <button
            type="button"
            onClick={() => onDecrease(item)}
            aria-label={`Kurangi ${item.nama}`}
          >
            −
          </button>

          <span>{item.quantity}</span>

          <button
            type="button"
            onClick={() => onIncrease(item)}
            disabled={item.quantity >= item.stok}
            aria-label={`Tambah ${item.nama}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          className="remove-cart-button"
          onClick={() => onRemove(item.id)}
        >
          Hapus
        </button>
      </div>

      <div className="cart-item-subtotal">
        {rupiah(item.harga * item.quantity)}
      </div>
    </article>
  );
}

export default CartItem;
