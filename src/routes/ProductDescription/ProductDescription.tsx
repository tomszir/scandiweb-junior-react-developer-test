import { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Params } from "react-router-dom";
import AttributeSelect from "../../components/AttributeSelect";
import { AppDispatch, RootState } from "../../store";
import { addToCart } from "../../store/cartSlice";
import { fetchProductById, getPricedProduct } from "../../store/productSlice";
import { CartItem, PricedProduct } from "../../types";
import { withRouterParams } from "../../utils";
import * as S from "./ProductDescription.style";

class ProductDescription extends PureComponent<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  state: ProductDescriptionState = {
    selectedAttributes: {},
  };

  updateProduct = () => {
    this.setState({
      selectedAttributes: {},
    });

    const { params, fetchProductById } = this.props;

    if (!params.productId) {
      return;
    }

    fetchProductById(params.productId);
  };

  componentDidMount() {
    this.updateProduct();
  }

  componentDidUpdate(prevProps: ProductDescriptionProps) {
    if (prevProps.params.categoryId !== this.props.params.categoryId) {
      this.updateProduct();
    }
  }

  renderLoading() {
    return <S.Container>Loading...</S.Container>;
  }

  renderNotFound() {
    return <S.Container>Product not found.</S.Container>;
  }

  render() {
    const { product, loading, addToCart } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (!product) {
      return this.renderNotFound();
    }

    return (
      <>
        <Helmet>
          <title>{product.name} - Scandiweb Junior React Test</title>
        </Helmet>
        <S.Container>
          <S.ThumbnailGrid>
            {product.gallery.length > 1 && (
              <S.ThumbnailList>
                {product.gallery.slice(1).map((img) => {
                  return <S.Thumbnail key={img} alt="thumb" src={img} />;
                })}
              </S.ThumbnailList>
            )}
            <S.BigThumbnail alt="thumb" src={product.gallery[0]} />
          </S.ThumbnailGrid>
          <S.DescriptionList>
            <div>
              <S.Brand>{product.brand}</S.Brand>
              <S.Name>{product.name}</S.Name>
            </div>
            {product.attributes.map((set) => {
              return (
                <div key={set.id}>
                  <S.Label>{set.name}</S.Label>
                  <AttributeSelect
                    onSelect={(attr) => {
                      this.setState({
                        selectedAttributes: {
                          ...this.state.selectedAttributes,
                          [set.id]: attr.id,
                        },
                      });
                    }}
                    selectedAttributes={this.state.selectedAttributes}
                    set={set}
                  />
                </div>
              );
            })}
            <div>
              <S.Label>Price</S.Label>
              <S.Price>
                {product.price.currency.symbol}
                {product.price.amount}
              </S.Price>
            </div>
            <S.CartButton
              inStock={product.inStock}
              onClick={() =>
                product.inStock &&
                addToCart(product.id, this.state.selectedAttributes)
              }
            >
              {product.inStock ? "Add to cart" : "out of stock"}
            </S.CartButton>
            <S.Description
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </S.DescriptionList>
        </S.Container>
      </>
    );
  }
}

export interface ProductDescriptionProps {
  params: Params;
  loading: boolean;
  product: PricedProduct | null;
  cart: CartItem[];
  addToCart: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
  fetchProductById: (id: string) => void;
}

export interface ProductDescriptionState {
  selectedAttributes: { [key: string]: string };
}

export const mapStateToProps = (state: RootState) => ({
  loading: state.product.loading,
  product: getPricedProduct(state),
  cart: state.cart.items,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(addToCart({ id, selectedAttributes })),
  fetchProductById: (id: string) => dispatch(fetchProductById(id)),
});

export default withRouterParams(
  // @ts-ignore
  connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
);
