import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Pagination } from "@canonical/react-components";
import { getProducts } from "../api/products";
import type { Product } from "../types/product";

type Status = "loading" | "error" | "success";

const ITEMS_PER_PAGE = 20;

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState<Status>("loading");

  const handlePageChange = (page: number) => {
    setStatus("loading");
    setCurrentPage(page);
  };

  useEffect(() => {
    let ignore = false;
    const skip = (currentPage - 1) * ITEMS_PER_PAGE;

    getProducts(ITEMS_PER_PAGE, skip)
      .then(({ products, total }) => {
        if (!ignore) {
          setProducts(products);
          setTotal(total);
          setStatus("success");
        }
      })
      .catch(() => !ignore && setStatus("error"));

    return () => {
      ignore = true;
    };
  }, [currentPage]);

  if (status === "error") {
    return (
      <main className="catalog">
        <div className="container">
          <div className="catalog__error">
            <span className="catalog__error-icon">!</span>
            <h2>Something went wrong</h2>
            <p>We couldn't load the products. Please try again.</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="catalog">
      <div className="container">
        <section className="catalog__header">
          <div>
            <span className="catalog__eyebrow">OUR COLLECTION</span>
            <h1>Discover products</h1>

            <p>
              Explore our collection of carefully selected products for every
              part of your life.
            </p>
          </div>

          <div className="catalog__count">
            <strong>{total}</strong>
            <span>products</span>
          </div>
        </section>

        <section className="catalog__toolbar">
          <div className="catalog__results">
            {status === "success" && products.length > 0 ? (
              <>
                Showing{" "}
                <strong>
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, total)}
                </strong>{" "}
                of <strong>{total}</strong>
              </>
            ) : (
              "Products"
            )}
          </div>
        </section>

        {status === "loading" ? (
          <div className="catalog__grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <div className="product-card product-card--skeleton" key={index}>
                <div className="product-card__image-skeleton" />

                <div className="product-card__content">
                  <div className="skeleton-line skeleton-line--small" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line skeleton-line--price" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="catalog__empty">
            <div className="catalog__empty-icon">⌕</div>
            <h2>No products found</h2>
            <p>There are currently no products available.</p>
          </div>
        ) : (
          <>
            <section className="catalog__grid">
              {products.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-card__image-wrapper">
                    <img
                      className="product-card__image"
                      src={product.thumbnail}
                      alt={product.title}
                    />

                    <span className="product-card__quick-view">
                      View product →
                    </span>
                  </div>

                  <div className="product-card__content">
                    <span className="product-card__category">
                      {product.category}
                    </span>

                    <h2>{product.title}</h2>

                    <div className="product-card__bottom">
                      <strong>${product.price.toFixed(2)}</strong>

                      <span className="product-card__rating">
                        <span className="product-card__star">★</span>
                        {product.rating.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </section>

            {total > ITEMS_PER_PAGE && (
              <div className="pagination-wrapper">
                <Pagination
                  currentPage={currentPage}
                  itemsPerPage={ITEMS_PER_PAGE}
                  totalItems={total}
                  paginate={handlePageChange}
                  scrollToTop
                  aria-label="Product pages"
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
