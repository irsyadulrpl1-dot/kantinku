import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home-page">
      <div className="welcome-banner">
        <span className="banner-label">KANTINKU MARKETPLACE</span>

        <h1>Selamat Datang di Kantinku!</h1>

        <p>
          Temukan makanan dan minuman favoritmu. Pesan menu kantin sekolah
          dengan mudah dan praktis.
        </p>

        <Link to="/menu" className="home-menu-button">
          Lihat Menu
        </Link>
      </div>
    </section>
  );
}

export default Home;
