import type { Product, ProductsResponse } from "../types/product.ts";

const BASE_URL = "https://dummyjson.com";

export async function getProducts(
  limit = 20,
  skip = 0,
): Promise<ProductsResponse> {
  const res = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
  if (!res.ok) throw new Error(`Failed to load products (${res.status})`);
  const data: ProductsResponse = await res.json();
  return data;
}

export async function getProduct(id: string | number): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error(`Failed to load product ${id} (${res.status})`);
  return res.json();
}
