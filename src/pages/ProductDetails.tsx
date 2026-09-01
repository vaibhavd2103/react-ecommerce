import { Link, useParams } from "react-router-dom";
import { getProduct } from "../data/products";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;

  if (!product) {
    return (
      <div className="page product-details">
        <h1>Product not found</h1>
        <Link to="/catalog">Back to catalog</Link>
      </div>
    );
  }

  return (
    <div className="page product-details">
      <h1>{product.name}</h1>
      <p className="price">${product.price.toFixed(2)}</p>
      <p>{product.description}</p>
      <Link to="/catalog">Back to catalog</Link>
    </div>
  );
}

export default ProductDetails;
