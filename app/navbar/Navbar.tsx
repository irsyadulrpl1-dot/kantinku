type NavbarProps = {
  onSearch: (value: string) => void;
};

function Navbar({ onSearch }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Selamat datang! 👋</h2>
        <p>Mau makan apa hari ini?</p>
      </div>

      <div className="navbar-right">
        <div className="navbar-search">
          <span>⌕</span>

          <input
            type="text"
            placeholder="Cari makanan favorit..."
            onChange={(event) => onSearch(event.target.value)}
          />
        </div>

        <button
          type="button"
          className="navbar-notification"
          aria-label="Notifikasi"
        >
          ♧<span></span>
        </button>

        <div className="navbar-profile">
          <div className="profile-avatar">I</div>

          <div className="profile-info">
            <strong>Pengguna</strong>
            <span>Siswa</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
