import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { client } from "../gql";
import { ProductPreview } from "../types";
import { productToPricedProduct } from "../utils/index";

interface CategoryState {
  loadingNames: boolean;
  loadingProducts: boolean;
  categoryNames: string[];
  currentCategoryName: string;
  products: ProductPreview[];
}

const initialState: CategoryState = {
  loadingNames: true,
  loadingProducts: true,
  currentCategoryName: "",
  categoryNames: [],
  products: [],
};

const CATEGORY_NAME_QUERY = gql`
  query {
    categories {
      name
    }
  }
`;

type CategoryNameQueryData = {
  categories: {
    name: string;
  }[];
};

const CATEGORIES_QUERY = gql`
  query Category($title: String!) {
    category(input: { title: $title }) {
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

type CategoryQueryData = {
  category: {
    name: string;
    products: ProductPreview[];
  };
};

type CategoryQueryVariables = {
  title: string;
};

export const fetchCategoryNames = createAsyncThunk(
  "categories/fetchCategoryNames",
  async () => {
    const { data } = await client.query<CategoryNameQueryData>({
      query: CATEGORY_NAME_QUERY,
    });

    return data;
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  "categories/fetchCategoryProducts",
  async (title: string) => {
    const { data } = await client.query<
      CategoryQueryData,
      CategoryQueryVariables
    >({
      query: CATEGORIES_QUERY,
      variables: {
        title,
      },
    });

    return data;
  }
);

export const categorySlice = createSlice({
  initialState,
  name: "categories",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategoryProducts.pending, (state) => {
      state.loadingProducts = true;
    });
    builder.addCase(
      fetchCategoryProducts.fulfilled,
      (state, action: PayloadAction<CategoryQueryData>) => {
        const {
          category: { products },
        } = action.payload;

        state.loadingProducts = false;
        state.products = products;
      }
    );

    builder.addCase(fetchCategoryNames.pending, (state) => {
      state.loadingNames = true;
    });
    builder.addCase(
      fetchCategoryNames.fulfilled,
      (state, action: PayloadAction<CategoryNameQueryData>) => {
        const {
          payload: { categories },
        } = action;

        state.categoryNames = categories.map(({ name }) => name);
        state.loadingNames = false;
      }
    );
  },
});

export const getPricedProducts = (state: RootState) => {
  return state.categories.products.map((p) =>
    productToPricedProduct(p, state.currency.current)
  );
};

export default categorySlice.reducer;
