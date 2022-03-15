import { gql } from "@apollo/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { client } from "../gql";
import { Currency } from "../types";

interface CurrencyState {
  currencies: Currency[];
  current: Currency;
  loading: boolean;
}

const initialState: CurrencyState = {
  currencies: [],
  current: {
    label: "USD",
    symbol: "$",
  },
  loading: false,
};

export type CurrencyQueryData = {
  currencies: Currency[];
};

export const CURRENCY_QUERY = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;

export const fetchCurrencies = createAsyncThunk(
  "currency/fetchCurrencies",
  async () => {
    const { data } = await client.query<CurrencyQueryData>({
      query: CURRENCY_QUERY,
    });

    return data;
  }
);

export const currencySlice = createSlice({
  initialState,
  name: "currency",
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.current = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencies.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCurrencies.fulfilled,
      (state, action: PayloadAction<CurrencyQueryData>) => {
        const { currencies } = action.payload;

        state.currencies = currencies;
        state.current = currencies[0];
        state.loading = false;
      }
    );
  },
});

export const { setCurrency } = currencySlice.actions;

export default currencySlice.reducer;
