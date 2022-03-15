import { PureComponent } from "react";
import { connect } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "../../routes/Cart/Cart";
import ProductDescription from "../../routes/ProductDescription/ProductDescription";
import ProductListing from "../../routes/ProductListing";
import { AppDispatch, RootState } from "../../store";
import { fetchCategoryNames } from "../../store/categorySlice";
import { fetchCurrencies } from "../../store/currencySlice";
import CartOverlay from "../CartOverlay";
import Nav from "../Nav";
import * as S from "./App.style";

class App extends PureComponent<AppProps> {
  renderCartOverlay = () => {
    const { isCartOverlayOpen } = this.props;

    if (!isCartOverlayOpen) {
      return null;
    }

    return <CartOverlay />;
  };

  renderRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path="/:categoryId" element={<ProductListing />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    );
  };

  componentDidMount() {
    const { fetchCurrencies, fetchCategoryNames } = this.props;
    fetchCurrencies();
    fetchCategoryNames();
  }

  render() {
    const { categoriesLoading, currenciesLoading } = this.props;

    if (categoriesLoading || currenciesLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <>
        <Nav />
        <S.Main>
          {this.renderRouter()}
          {this.renderCartOverlay()}
        </S.Main>
      </>
    );
  }
}

interface AppProps {
  categoriesLoading: boolean;
  currenciesLoading: boolean;
  isCartOverlayOpen: boolean;
  fetchCategoryNames: () => void;
  fetchCurrencies: () => void;
}

export const mapStateToProps = (state: RootState) => ({
  categoriesLoading: state.categories.loadingNames,
  currenciesLoading: state.currency.loading,
  isCartOverlayOpen: state.cart.isOverlayOpen,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryNames: () => dispatch(fetchCategoryNames()),
  fetchCurrencies: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
