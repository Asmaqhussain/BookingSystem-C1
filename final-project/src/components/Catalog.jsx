export default function Catalog() {
  return (
    <section id="catalog" className="catalog">
      <div className="container">
        <h2>Featured kayaks</h2>

        <div className="grid">
          <div className="card">
            <h3>Recreational</h3>
            <img src="/images/recreational.jpg" alt="Recreational kayak in bright yellow on a dock" />
            <p className="card-text">
              Stable and comfortable for lakes and calm rivers — perfect for first-timers.
            </p>
          </div>

          <div className="card">
            <h3>Touring</h3>
            <img src="/images/touring.jpg" alt="Sleek touring kayak cutting through coastal water" />
            <p className="card-text">
              Longer range, better tracking — ideal for coastal routes and day trips.
            </p>
          </div>

          <div className="card">
            <h3>Tandem</h3>
            <img src="/images/tandem.jpg" alt="Two-person tandem kayak with paddlers smiling" />
            <p className="card-text">
              Share the paddle — balanced and roomy for pairs or parents with kids.
            </p>
          </div>

          <div className="card">
            <h3>Inflatable</h3>
            <img src="/images/inflatable.jpg" alt="Compact inflatable kayak packed in a car trunk" />
            <p className="card-text">
              Portable and convenient for travelers — easy to transport and store.
            </p>
          </div>
        </div>

        <div className="section-cta">
          <a className="btn primary" href="#cta">Explore locations</a>
        </div>
      </div>
    </section>
  );
}
