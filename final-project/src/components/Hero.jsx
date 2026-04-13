import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Find your flow — kayaks for every journey</h1>

        <p>
          From calm lakes to coastal runs, we make paddling easy with flexible
          rentals and friendly local guidance.
        </p>

        <div className="hero-buttons">
          <a href="#catalog" className="btn primary">View catalog</a>
          <a href="#benefits" className="btn ghost">Why choose us</a>
          <a href="#order" className="btn ghost">Place order</a>
        </div>
      </div>

      <div className="hero-right">
        <img src="/images/hero.jpg" alt="Kayaking at sunset" />
      </div>
    </section>
  );
}
