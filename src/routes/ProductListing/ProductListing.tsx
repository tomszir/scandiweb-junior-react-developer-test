import { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Navigate, Params } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { AppDispatch, RootState } from "../../store";
import {
  fetchCategoryProducts,
  getPricedProducts,
} from "../../store/categorySlice";
import { PricedProductPreview } from "../../types";
import { capitalize, withRouterParams } from "../../utils";
import * as S from "./ProductListing.style";

class ProductListing extends PureComponent<ProductListingProps> {
  state: ProductListingState = {
    validCategoryName: true,
  };

  componentDidMount() {
    this.fetchCategoryProducts();
  }

  componentDidUpdate(prevProps: ProductListingProps) {
    if (prevProps.params.categoryId !== this.props.params.categoryId) {
      this.fetchCategoryProducts();
    }
  }

  fetchCategoryProducts() {
    const { params, categoryNames, fetchCategoryProducts } = this.props;
    const categoryName = params.categoryId;

    if (!categoryName || !categoryNames.includes(categoryName)) {
      this.setState({
        validCategoryName: false,
      });
      return;
    }

    fetchCategoryProducts(categoryName);
  }

  renderMeta() {
    const { params } = this.props;

    return (
      <Helmet>
        <title>
          {capitalize(params.categoryId as string)} - Scandiweb Junior React
          Test
        </title>
      </Helmet>
    );
  }

  render() {
    const { params } = this.props;
    const { validCategoryName } = this.state;

    if (!validCategoryName) {
      return <Navigate to="/" />;
    }

    return (
      <>
        <S.Container>
          <S.Heading>{params.categoryId as string}</S.Heading>
          <S.ProductGrid>{this.renderProducts()}</S.ProductGrid>
        </S.Container>
      </>
    );
  }

  renderProducts() {
    const { products } = this.props;

    return (
      <>
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </>
    );
  }
}

export interface ProductListingProps {
  params: Params;
  loading: boolean;
  products: PricedProductPreview[];
  categoryNames: string[];
  fetchCategoryProducts: (title: string) => void;
}

export interface ProductListingState {
  validCategoryName: boolean;
}

export const mapStateToProps = (state: RootState) => ({
  loading: state.categories.loadingProducts,
  products: getPricedProducts(state),
  categoryNames: state.categories.categoryNames,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  fetchCategoryProducts: (title: string) =>
    dispatch(fetchCategoryProducts(title)),
});

export default withRouterParams(
  connect(mapStateToProps, mapDispatchToProps)(ProductListing)
);
