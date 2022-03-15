import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";
import { client } from "../gql";
import { CartItem, PricedCartItem, Product } from "../types";
import { productToPricedProduct } from "../utils/index";

interface CartState {
  items: CartItem[];
  isOverlayOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOverlayOpen: false,
};

const GET_PRODUCT = gql`
  query Product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      brand
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
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

type GetProductQueryData = {
  product: Product;
};

type GetProductQueryVariables = {
  id: string;
};

type AddToCartPayload = {
  data: GetProductQueryData;
  selectedAttributes?: { [key: string]: string };
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({
    id,
    selectedAttributes,
  }: {
    id: string;
    selectedAttributes?: { [key: string]: string };
  }) => {
    const { data } = await client.query<
      GetProductQueryData,
      GetProductQueryVariables
    >({
      query: GET_PRODUCT,
      variables: {
        id,
      },
    });

    return { data, selectedAttributes };
  }
);

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    toggleOverlay: (state) => {
      state.isOverlayOpen = !state.isOverlayOpen;
    },
    setActiveAttribute: (
      state,
      action: PayloadAction<{
        id: string;
        attributeId: string;
        attributeItemId: string;
      }>
    ) => {
      const {
        payload: { id, attributeId, attributeItemId },
      } = action;
      const item = state.items.find((c) => c.product.id === id);

      if (!item) {
        return;
      }
      const index = state.items.indexOf(item);

      state.items[index] = {
        ...item,
        selectedAttributes: {
          ...item.selectedAttributes,
          [attributeId]: attributeItemId,
        },
      };
    },
    incrementItem: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const item = state.items.find((c) => c.product.id === payload);

      if (!item) {
        return;
      }

      const index = state.items.indexOf(item);

      state.items[index] = {
        ...item,
        amount: item.amount + 1,
      };
    },
    decrementItem: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const item = state.items.find((c) => c.product.id === payload);

      // Item not in the cart, nothing to decrement
      if (!item) {
        return;
      }

      if (item.amount === 1) {
        state.items = state.items.filter(
          ({ product: { id } }) => id !== payload
        );
        return;
      }

      const index = state.items.indexOf(item);

      state.items[index] = {
        ...item,
        amount: item.amount - 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      addToCart.fulfilled,
      (state, action: PayloadAction<AddToCartPayload>) => {
        const {
          payload: {
            data: { product },
            selectedAttributes,
          },
        } = action;

        const { id } = product;
        const item = state.items.find((c) => c.product.id === id);

        // Item is not in the cart right now
        if (!item) {
          const defaultSelectedAttributes = product.attributes
            .map((attr) => {
              return {
                key: attr.id,
                value: attr.items[0].id,
              };
            })
            .reduce((a, b) => ({ ...a, [b.key]: b.value }), {});

          state.items = [
            ...state.items,
            {
              product,
              selectedAttributes: {
                ...defaultSelectedAttributes,
                ...(selectedAttributes || {}),
              },
              amount: 1,
            },
          ];

          return;
        }

        const index = state.items.indexOf(item);

        state.items[index] = {
          ...item,
          selectedAttributes: {
            ...item.selectedAttributes,
            ...(selectedAttributes || {}),
          },
          amount: item.amount + 1,
        };
      }
    );
  },
});

export const {
  toggleOverlay,
  setActiveAttribute,
  incrementItem,
  decrementItem,
} = cartSlice.actions;

export const getItemCount = (state: RootState) =>
  state.cart.items.reduce((a, b) => a + b.amount, 0);

export const getItemTotalCost = (state: RootState) =>
  getPricedCartItems(state).reduce(
    (a, b) => a + b.product.price.amount * b.amount,
    0
  );

export const getPricedCartItems: (state: RootState) => PricedCartItem[] = (
  state
) => {
  return state.cart.items.map(({ product, ...rest }) => {
    return {
      ...rest,
      product: productToPricedProduct(product, state.currency.current),
    };
  }) as PricedCartItem[];
};

export default cartSlice.reducer;
