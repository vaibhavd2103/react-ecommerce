import { Link, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Catalog from "./pages/Catalog";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="app">
      <header className="p-navigation is-dark">
        <div className="p-navigation__row">
          <div className="p-navigation__banner">
            <div className="p-navigation__logo">
              <Link className="p-navigation__item" to="/">
                <span className="p-navigation__link">Home</span>
              </Link>
              <Link className="p-navigation__item" to="/catalog">
                <span className="p-navigation__link">Catalog</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
