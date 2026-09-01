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

  if (status === "error") return <p>Something went wrong.</p>;

  return (
    <div className="container">
      <h1>Products</h1>

      {status === "loading" ? (
        <p>Loading products…</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-card-wrapper">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <h4>
                <Link to={`/product/${product.id}`}>{product.title}</Link>
              </h4>
              <div className="product-card__price">
                <p>${product.price}</p>
                <p className="product-card__rating">
                  <span className="product-card__star">★</span>{" "}
                  {product.rating.toFixed(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

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
    </div>
  );
}
