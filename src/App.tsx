import { Link, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="app">
      <header className="p-navigation is-dark">
        <div className="p-navigation__row site-nav">
          <div className="p-navigation__banner">
            <div className="p-navigation__logo">
              <Link to="/" className="p-navigation__link site-nav__brand">
                <svg
                  className="site-nav__logo"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1Zm-9-1a2 2 0 0 1 4 0v1h-4V6Zm8 13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v10Z" />
                </svg>
                <span className="site-nav__name">ReactShop</span>
              </Link>
            </div>
          </div>

          {/* RIGHT: nav links, in their own <nav> */}
          <nav className="p-navigation__nav" aria-label="Main">
            <ul className="p-navigation__items">
              <li className="p-navigation__item">
                <Link className="p-navigation__link" to="/">
                  Home
                </Link>
              </li>
              <li className="p-navigation__item">
                <Link className="p-navigation__link" to="/catalog">
                  Catalog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
