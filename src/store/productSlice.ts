import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { client } from "../gql";
import { Product } from "../types";
import { productToPricedProduct } from "../utils/index";

export type ProductState = {
  product: Product | null;
  loading: boolean;
};

const initialState: ProductState = {
  product: null,
  loading: false,
};

export type ProductQueryData = {
  product: Product;
};

export type ProductQueryVariables = {
  id: string;
};

export const PRODUCT_QUERY = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      brand
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id: string) => {
    const { data } = await client.query<
      ProductQueryData,
      ProductQueryVariables
    >({
      query: PRODUCT_QUERY,
      variables: {
        id,
      },
    });

    return data;
  }
);

const productSlice = createSlice({
  initialState,
  name: "product",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductById.pending, (state) => {
      state.product = null;
      state.loading = true;
    });
    builder.addCase(
      fetchProductById.fulfilled,
      (state, action: PayloadAction<ProductQueryData>) => {
        const {
          payload: { product },
        } = action;

        state.product = product;
        state.loading = false;
      }
    );
  },
});

export const getPricedProduct = (state: RootState) =>
  state.product.product
    ? productToPricedProduct(state.product.product, state.currency.current)
    : null;

export default productSlice.reducer;
