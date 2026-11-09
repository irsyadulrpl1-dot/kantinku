import { useState } from "react";

import ProductCard from "../components/ProductCard";
import { menu } from "../data/products";

type MenuProps = {
  getQuantityInCart: (id: number) => number;
};

function Menu({ getQuantityInCart }: MenuProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [sort, setSort] = useState("default");

  const filteredMenu = menu
    .filter((item) => {
      const matchesSearch = item.nama
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        category === "Semua" || item.kategori === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "cheapest") return a.harga - b.harga;
      if (sort === "expensive") return b.harga - a.harga;
      if (sort === "name") return a.nama.localeCompare(b.nama);

      return a.id - b.id;
    });

  return (
    <section className="menu-page">
      <div className="section-heading">
        <span className="section-label">KATALOG KANTINKU</span>
        <h1>Jelajahi Menu</h1>
        <p>Temukan makanan dan minuman favoritmu.</p>
      </div>

      <div className="menu-toolbar">
        <input
          type="search"
          placeholder="Cari nama menu..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="Makanan">Makanan</option>
          <option value="Minuman">Minuman</option>
          <option value="Camilan">Camilan</option>
        </select>

        <select value={sort} onChange={(event) => setSort(event.target.value)}>
          <option value="default">Urutan awal</option>
          <option value="cheapest">Harga termurah</option>
          <option value="expensive">Harga termahal</option>
          <option value="name">Nama A-Z</option>
        </select>
      </div>

      <div className="product-grid">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              image=""
              seller="Kantin Sekolah"
              quantityInCart={getQuantityInCart(product.id)}
            />
          ))
        ) : (
          <div className="empty-state">
            <p>Menu tidak ditemukan.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Menu;
