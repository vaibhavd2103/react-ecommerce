// src/pages/ProductDetails.tsx
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import type { Product } from "../types/product";
import ImageSlider from "../components/ImageSlider";

type Status = "loading" | "error" | "success";

function ProductDetails() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="container product-details">
        <h1>Product not found</h1>
        <Link to="/catalog">← Back to catalog</Link>
      </div>
    );
  }

  return <ProductDetailsContent id={id} />;
}

function ProductDetailsContent({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    let ignore = false;

    getProduct(id)
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setStatus("success");
        }
      })
      .catch(() => !ignore && setStatus("error"));

    return () => {
      ignore = true;
    };
  }, [id]);

  if (status === "loading") {
    return (
      <div className="container">
        <p>Loading…</p>
      </div>
    );
  }

  if (status === "error" || !product) {
    return (
      <div className="container product-details">
        <h1>Product not found</h1>
        <Link to="/catalog">← Back to catalog</Link>
      </div>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const finalPrice = hasDiscount
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;

  // fall back to the thumbnail if the images array is empty
  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="container product-details">
      <Link className="product-details__back" to="/catalog">
        ← Back to catalog
      </Link>

      <div className="row">
        <div className="col-6">
          <ImageSlider images={images} alt={product.title} />
        </div>

        <div className="col-6 product-details__info">
          {product.brand && (
            <p className="product-details__brand">{product.brand}</p>
          )}
          <h1 className="product-details__title">{product.title}</h1>

          <div className="product-details__rating">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <div className="product-details__pricing">
            <span className="product-details__price">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="product-details__price--original">
                  ${product.price.toFixed(2)}
                </span>
                <span className="product-details__discount">
                  −{product.discountPercentage}%
                </span>
              </>
            )}
          </div>

          <p className="product-details__description">{product.description}</p>

          <button className="p-button--positive" type="button">
            Add to cart
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="product-details__reviews">
          <h2>Reviews</h2>
          {product.reviews.map((review, i) => (
            <div className="review" key={i}>
              <div className="review__head">
                <strong>{review.reviewerName}</strong>
                <span className="review__rating">★ {review.rating}</span>
              </div>
              <p className="review__comment">{review.comment}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
