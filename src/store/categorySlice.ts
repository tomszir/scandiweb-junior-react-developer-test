import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { client } from "../gql";
import { PricedProductPreview, ProductPreview } from "../types";
import { productToPricedProduct } from "../utils/index";

interface CategoryState {
  loading: boolean;
  products: {
    [key: string]: ProductPreview[];
  };
}

const initialState: CategoryState = {
  loading: false,
  products: {},
};

const CATEGORIES_QUERY = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        brand
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

type CategoriesQueryData = {
  categories: {
    name: string;
    products: ProductPreview[];
  }[];
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchInitialCategories",
  async () => {
    const { data } = await client.query<CategoriesQueryData>({
      query: CATEGORIES_QUERY,
    });

    return data;
  }
);

export const categorySlice = createSlice({
  initialState,
  name: "categories",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategories.fulfilled,
      (state, action: PayloadAction<CategoriesQueryData>) => {
        const { categories } = action.payload;

        state.products = categories.reduce((a, b) => {
          return { ...a, [b.name]: b.products };
        }, {});
        state.loading = false;
      }
    );
  },
});

export const getCategoryNames = (state: RootState) =>
  Object.keys(state.categories.products);

export const getPricedProducts: (state: RootState) => {
  [key: string]: PricedProductPreview[];
} = (state) => {
  return Object.keys(state.categories.products)
    .map((key) => {
      const products = state.categories.products[key];

      return {
        key,
        products: products.map((p) =>
          productToPricedProduct(p, state.currency.current)
        ),
      };
    })
    .reduce(
      (a, b) => ({
        ...a,
        [b.key]: b.products,
      }),
      {}
    );
};

// export const {} = categorySlice.actions;

export default categorySlice.reducer;
