import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProduct } from "../api/products";
import type { Product } from "../types/product";
import ImageSlider from "../components/ImageSlider";

type Status = "loading" | "error" | "success";

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span className="stars" aria-hidden="true">
      {"★".repeat(full)}
      {"☆".repeat(Math.max(0, 5 - full))}
    </span>
  );
}

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!id) return;
    let ignore = false;
    setStatus("loading");
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
  const images = product.images?.length ? product.images : [product.thumbnail];
  const inStock = product.stock > 0;

  return (
    <div className="container product-details">
      <nav className="product-details__breadcrumb" aria-label="Breadcrumb">
        <Link to="/catalog">Catalog</Link>
        <span aria-hidden="true"> / </span>
        <span className="product-details__crumb-category">
          {product.category}
        </span>
        <span aria-hidden="true"> / </span>
        <span>{product.title}</span>
      </nav>

      <div className="row">
        <div className="col-5">
          <ImageSlider images={images} alt={product.title} />
        </div>

        <div className="col-4 product-details__info">
          {product.brand && (
            <p className="product-details__brand">
              Visit the {product.brand} Store
            </p>
          )}
          <h1 className="product-details__title">{product.title}</h1>

          <div className="product-details__rating">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(2)}</span>
            <a href="#reviews" className="product-details__rating-count">
              {product.reviews.length} ratings
            </a>
          </div>

          <hr className="p-rule" />

          <div className="product-details__pricing">
            {hasDiscount && (
              <span className="product-details__discount-badge">
                −{Math.round(product.discountPercentage)}%
              </span>
            )}
            <span className="product-details__price">
              ${finalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="product-details__price--original">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <hr className="p-rule" />

          <h2 className="p-heading--5">About this item</h2>
          <p className="product-details__description">{product.description}</p>

          {product.tags.length > 0 && (
            <div className="product-details__tags">
              {product.tags.map((tag) => (
                <span className="p-chip" key={tag}>
                  <span className="p-chip__value">{tag}</span>
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="col-3">
          <div className="p-card product-buy">
            <span className="product-buy__price">${finalPrice.toFixed(2)}</span>
            <p className="product-buy__shipping">
              {product.shippingInformation}
            </p>
            <p
              className={
                "product-buy__stock" +
                (inStock
                  ? " product-buy__stock--in"
                  : " product-buy__stock--out")
              }
            >
              {product.availabilityStatus}
            </p>

            <button
              className="p-button--positive product-buy__button"
              type="button"
              disabled={!inStock}
            >
              Add to cart
            </button>
            <button
              className="p-button product-buy__button product-buy__button--buy"
              type="button"
              disabled={!inStock}
            >
              Buy now
            </button>

            <ul className="product-buy__meta p-list">
              <li className="p-list__item">
                Warranty: {product.warrantyInformation}
              </li>
              <li className="p-list__item">Returns: {product.returnPolicy}</li>
              <li className="p-list__item">
                Min. order: {product.minimumOrderQuantity} units
              </li>
            </ul>
          </div>
        </div>
      </div>

      <section className="product-details__section">
        <h2>Product information</h2>
        <table className="product-details__specs">
          <tbody>
            <tr>
              <th scope="row">Brand</th>
              <td>{product.brand ?? "—"}</td>
            </tr>
            <tr>
              <th scope="row">Category</th>
              <td>{product.category}</td>
            </tr>
            <tr>
              <th scope="row">SKU</th>
              <td>{product.sku}</td>
            </tr>
            <tr>
              <th scope="row">Weight</th>
              <td>{product.weight} g</td>
            </tr>
            <tr>
              <th scope="row">Dimensions</th>
              <td>
                {product.dimensions.width} × {product.dimensions.height} ×{" "}
                {product.dimensions.depth} cm
              </td>
            </tr>
            <tr>
              <th scope="row">Warranty</th>
              <td>{product.warrantyInformation}</td>
            </tr>
            <tr>
              <th scope="row">Shipping</th>
              <td>{product.shippingInformation}</td>
            </tr>
            <tr>
              <th scope="row">Return policy</th>
              <td>{product.returnPolicy}</td>
            </tr>
            <tr>
              <th scope="row">Barcode</th>
              <td>{product.meta.barcode}</td>
            </tr>
          </tbody>
        </table>
      </section>

      {product.reviews.length > 0 && (
        <section className="product-details__section" id="reviews">
          <h2>Customer reviews</h2>
          <div className="product-details__reviews-summary">
            <Stars rating={product.rating} />
            <span>{product.rating.toFixed(2)} out of 5</span>
            <span>· {product.reviews.length} global ratings</span>
          </div>

          {product.reviews.map((review, i) => (
            <div className="review" key={i}>
              <div className="review__head">
                <strong>{review.reviewerName}</strong>
                <Stars rating={review.rating} />
              </div>
              <p className="review__date">
                Reviewed on {new Date(review.date).toLocaleDateString()}
              </p>
              <p className="review__comment">{review.comment}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}

export default ProductDetails;
