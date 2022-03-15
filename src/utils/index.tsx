import { useParams } from "react-router-dom";
import { Currency, Price, Product, ProductPreview } from "../types";

export const withRouterParams = (Component: any) => (props: any) =>
  <Component params={useParams()} {...props} />;

export const getCurrentPrice = (prices: Price[], currentCurrency: Currency) => {
  const price = prices.find((p) => p.currency.label === currentCurrency.label);

  if (!price) {
    return prices[0];
  }

  return price;
};

export const productToPricedProduct = (
  product: Product | ProductPreview,
  currentCurrency: Currency
) => {
  return {
    ...product,
    price: getCurrentPrice(product.prices, currentCurrency),
  };
};

export const capitalize = (s: string) =>
  s
    .split(" ")
    .map((a) => a.charAt(0).toUpperCase() + a.slice(1))
    .join(" ");
