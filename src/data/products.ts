export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const products: Product[] = [
  { id: "1", name: "Wireless Headphones", price: 99.99, description: "Over-ear headphones with active noise cancellation and 30-hour battery life." },
  { id: "2", name: "Mechanical Keyboard", price: 129.0, description: "Hot-swappable switches, RGB backlight, and an aluminium frame." },
  { id: "3", name: "USB-C Hub", price: 45.5, description: "7-in-1 hub with HDMI, SD card reader, and 100W power delivery." },
  { id: "4", name: "4K Monitor", price: 349.99, description: "27-inch IPS display with 99% sRGB coverage and a height-adjustable stand." },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
