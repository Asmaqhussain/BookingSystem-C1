export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <a className="logo" href="#">BlueCurrent Rentals</a>

        <div className="nav-actions">
          <a href="#" className="nav-cta">Home</a>
          <a href="#catalog" className="nav-cta">Catalog</a>
          <a href="#about" className="nav-cta">About</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </div>
      </nav>
    </header>
  );
}
