import { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Params } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import { RootState } from "../../store";
import { getPricedProducts } from "../../store/categorySlice";
import { PricedProductPreview } from "../../types";
import { capitalize, withRouterParams } from "../../utils";
import * as S from "./ProductListing.style";

class ProductListing extends PureComponent<ProductListingProps> {
  render() {
    const { params, products } = this.props;

    const categoryName = params.categoryId || "all";
    const categoryProducts = products[categoryName] || [];

    return (
      <>
        <Helmet>
          <title>
            {capitalize(categoryName)} - Scandiweb Junior React Test
          </title>
        </Helmet>
        <S.Container>
          <S.Heading>{categoryName}</S.Heading>
          <S.ProductGrid>{this.renderProducts(categoryProducts)}</S.ProductGrid>
        </S.Container>
      </>
    );
  }

  renderProducts(products: PricedProductPreview[]) {
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
  products: {
    [key: string]: PricedProductPreview[];
  };
}

export const mapStateToProps = (state: RootState) => ({
  products: getPricedProducts(state),
});

export default withRouterParams(connect(mapStateToProps)(ProductListing));
