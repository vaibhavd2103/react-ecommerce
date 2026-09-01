// src/types/product.ts
export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews?: Review[];
}

// DummyJSON wraps lists in this envelope (unlike FakeStore's bare array)
export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
