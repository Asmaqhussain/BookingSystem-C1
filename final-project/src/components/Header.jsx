import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <nav className="nav">
        <Link className="logo" to="/">BlueCurrent Rentals</Link>

        <div className="nav-actions">
          <Link to="/" className="nav-cta">Home</Link>
          <a href="#catalog" className="nav-cta">Catalog</a>
          <a href="#about" className="nav-cta">About</a>
          <a href="#contact" className="nav-cta">Contact</a>
          <Link to="/form" className="nav-cta">Form</Link>
        </div>
      </nav>
    </header>
  );
}
