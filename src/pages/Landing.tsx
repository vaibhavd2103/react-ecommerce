import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className="page landing">
      <h1>Welcome to React Ecommerce</h1>
      <p>Discover great products at great prices.</p>
      <Link to="/catalog">Browse the catalog</Link>
    </div>
  );
}

export default Landing;
