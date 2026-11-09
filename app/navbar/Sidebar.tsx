type SidebarProps = {
  activePage: string;
  onNavigate: (page: string) => void;
};

const menuItems = [
  { id: "home", label: "Beranda", icon: "⌂" },
  { id: "canteens", label: "Daftar Kantin", icon: "▦" },
  { id: "favorites", label: "Favorit", icon: "♡" },
  { id: "cart", label: "Keranjang", icon: "🛒" },
  { id: "orders", label: "Riwayat Pesanan", icon: "▤" },
  { id: "profile", label: "Profil Saya", icon: "○" },
];

function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">K</div>

        <div>
          <h2>Kantinku</h2>
          <span>School Food Marketplace</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="sidebar-label">MENU UTAMA</p>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`sidebar-link ${
                activePage === item.id ? "active" : ""
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-help">
          <span>Butuh bantuan?</span>
          <p>Hubungi layanan Kantinku.</p>
        </div>

        <p className="sidebar-version">Kantinku v1.0</p>
      </div>
    </aside>
  );
}

export default Sidebar;
