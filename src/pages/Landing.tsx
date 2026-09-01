import { Link } from "react-router-dom";

function Landing() {
  return (
    <main className="landing">
      <section className="landing__hero">
        <div className="row">
          <div className="col-7 col-medium-12">
            <div className="landing__hero-content">
              <span className="landing__eyebrow">
                NEW SEASON · NEW POSSIBILITIES
              </span>

              <h1>
                Everything you need.
                <span> All in one place.</span>
              </h1>

              <p className="landing__hero-description">
                Discover thoughtfully selected products designed to make
                everyday life better. Quality products, great prices, and a
                shopping experience you'll love.
              </p>

              <div className="landing__actions">
                <Link
                  to="/catalog"
                  className="p-button--positive landing__primary-button"
                >
                  Browse catalog
                </Link>

                <Link to="/catalog" className="landing__secondary-button">
                  Explore collections
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="col-5 col-medium-12">
            <div className="landing__hero-visual">
              <div className="landing__hero-card">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1000"
                  alt="Modern ecommerce collection"
                />

                <div className="landing__floating-card">
                  <span className="landing__floating-icon">✓</span>
                  <div>
                    <strong>Curated for you</strong>
                    <small>Quality products</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__benefits">
        <div className="row">
          <div className="col-4 col-small-12">
            <div className="landing__benefit">
              <span>✓</span>
              <div>
                <strong>Quality guaranteed</strong>
                <p>Products selected with care</p>
              </div>
            </div>
          </div>

          <div className="col-4 col-small-12">
            <div className="landing__benefit">
              <span>↗</span>
              <div>
                <strong>Fast delivery</strong>
                <p>Get your order when you need it</p>
              </div>
            </div>
          </div>

          <div className="col-4 col-small-12">
            <div className="landing__benefit">
              <span>♡</span>
              <div>
                <strong>Customer first</strong>
                <p>We're here whenever you need us</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="landing__promo">
        <div className="row">
          <div className="col-8 col-medium-12">
            <span className="landing__eyebrow">LIMITED TIME OFFER</span>

            <h2>
              Make your next purchase
              <br />
              <span>worthwhile.</span>
            </h2>

            <p>
              Explore our latest collections and discover products made for
              modern living.
            </p>

            <Link
              to="/catalog"
              className="p-button--positive landing__promo-button"
            >
              Start shopping
            </Link>
          </div>

          <div className="col-4 col-medium-12">
            <div className="landing__promo-circle">
              <strong>20%</strong>
              <span>OFF</span>
              <small>selected items</small>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
