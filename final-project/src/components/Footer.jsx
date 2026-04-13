export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">

        <section>
          <h2>Contact</h2>
          <address>
            <p>Email: <a href="mailto:info@bluecurrent.fi">info@bluecurrent.fi</a></p>
            <p>Locations: Espoo Lakes, Helsinki Coast</p>
          </address>
        </section>

        <section>
          <h2>Links</h2>
          <ul className="footer-links">
            <li><a href="#about">About</a></li>
            <li><a href="catalog.html">Rentals</a></li>
            <li><a href="order.html">Order</a></li>
          </ul>
        </section>

        <section>
          <h2>Social</h2>
          <ul className="social">
            <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
            <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
            <li><a href="#"><i className="fab fa-tiktok"></i> TikTok</a></li>
          </ul>
        </section>

      </div>

      <p className="legal">© 2025 BlueCurrent Rentals. All rights reserved.</p>
    </footer>
  );
}
