import { PureComponent } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { Params } from "react-router-dom";
import AttributeSelect from "../../components/AttributeSelect";
import ProductGallery from "../../components/ProductGallery";
import { AppDispatch, RootState } from "../../store";
import { addToCart } from "../../store/cartSlice";
import { fetchProductById, getPricedProduct } from "../../store/productSlice";
import { Attribute, CartItem, PricedProduct } from "../../types";
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
      console.log("update!");
      this.updateProduct();
    }
  }

  renderLoading() {
    return <S.Container>Loading...</S.Container>;
  }

  renderNotFound() {
    return <S.Container>Product not found.</S.Container>;
  }

  renderProductImages(images: string[]) {
    return <ProductGallery images={images} />;
  }

  renderProductName(product: PricedProduct) {
    return (
      <div>
        <S.Brand>{product.brand}</S.Brand>
        <S.Name>{product.name}</S.Name>
      </div>
    );
  }

  renderProductAttributes(product: PricedProduct) {
    return product.attributes.map((set) => {
      const onSelect = (attr: Attribute) => {
        this.setState({
          selectedAttributes: {
            ...this.state.selectedAttributes,
            [set.id]: attr.id,
          },
        });
      };

      return (
        <div key={set.id}>
          <S.Label>{set.name}</S.Label>
          <AttributeSelect
            onSelect={onSelect}
            selectedAttributes={this.state.selectedAttributes}
            set={set}
          />
        </div>
      );
    });
  }

  renderProductPrice(product: PricedProduct) {
    return (
      <div>
        <S.Label>Price</S.Label>
        <S.Price>
          {product.price.currency.symbol}
          {product.price.amount}
        </S.Price>
      </div>
    );
  }

  renderCartButton(product: PricedProduct) {
    const { id, inStock } = product;
    const { addToCart } = this.props;
    const { selectedAttributes } = this.state;

    const onClick = () => inStock && addToCart(id, selectedAttributes);

    return (
      <S.CartButton inStock={inStock} onClick={onClick}>
        {product.inStock ? "add to cart" : "out of stock"}
      </S.CartButton>
    );
  }

  renderProductDescription(product: PricedProduct) {
    return (
      <S.Description
        dangerouslySetInnerHTML={{ __html: product.description }}
      />
    );
  }

  renderProduct(product: PricedProduct) {
    return (
      <S.Container>
        {this.renderProductImages(product.gallery)}
        <S.DescriptionList>
          {this.renderProductName(product)}
          {this.renderProductAttributes(product)}
          {this.renderProductPrice(product)}
          {this.renderCartButton(product)}
          {this.renderProductDescription(product)}
        </S.DescriptionList>
      </S.Container>
    );
  }

  renderMeta(title: string) {
    return (
      <Helmet>
        <title>{title} - Scandiweb Junior React Test</title>
      </Helmet>
    );
  }

  render() {
    const { product, loading } = this.props;

    if (loading) {
      return this.renderLoading();
    }

    if (!product) {
      return this.renderNotFound();
    }

    return (
      <>
        {this.renderMeta(product.name)}
        {this.renderProduct(product)}
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
