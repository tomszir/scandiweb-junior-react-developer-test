export type Product = {
  id: string;
  name: string;
  inStock: boolean;
  gallery: string[];
  description: string;
  category: string;
  attributes: [AttributeSet];
  prices: Price[];
  brand: string;
};

export type PricedProduct = Product & {
  price: Price;
};

export type ProductPreview = {
  id: string;
  name: string;
  inStock: boolean;
  brand: string;
  gallery: string[];
  prices: Price[];
};

export type PricedProductPreview = ProductPreview & {
  price: Price;
};

export type Category = {
  name: string;
  products: ProductPreview[];
};

export type PricedCategory = {
  name: string;
  products: PricedProductPreview[];
};

export type CartItem = {
  product: Product;
  selectedAttributes: {
    [key: string]: string;
  };
  amount: number;
};

export type PricedCartItem = {
  product: PricedProduct;
  selectedAttributes: {
    [key: string]: string;
  };
  amount: number;
};

export type AttributeSet = {
  id: string;
  name: string;
  type: string;
  items: Attribute[];
};

export type Attribute = {
  id: string;
  value: string;
  displayValue: string;
};

export type Price = {
  amount: number;
  currency: Currency;
};

export type Currency = {
  label: String;
  symbol: String;
};
