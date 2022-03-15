import { PureComponent } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { EmptyCartIcon } from "../../icons";
import { AppDispatch } from "../../store";
import { addToCart } from "../../store/cartSlice";
import { PricedProductPreview } from "../../types";
import * as S from "./ProductCard.style";

class ProductCard extends PureComponent<ProductCardProps, ProductCardState> {
  state: ProductCardState = {
    navigate: false,
  };

  navigate = () => {
    this.setState({
      navigate: true,
    });
  };

  render() {
    const { product, addToCart } = this.props;
    const { id, price, inStock, name, gallery } = product;
    const thumbnailUrl = gallery[0];

    if (this.state.navigate) {
      return <Navigate to={`/product/${product.id}`} />;
    }

    return (
      <S.Card inStock={inStock}>
        <S.ThumbnailWrapper>
          <S.Thumbnail
            onClick={this.navigate}
            alt="thumbnail"
            src={thumbnailUrl}
          />
          <S.CartButton onClick={() => addToCart(id, {})}>
            <EmptyCartIcon color="#fff" />
          </S.CartButton>
        </S.ThumbnailWrapper>
        <S.Name onClick={this.navigate}>{name}</S.Name>
        <S.Price>
          {price.currency.symbol}
          {price.amount}
        </S.Price>
      </S.Card>
    );
  }
}

export interface ProductCardProps {
  product: PricedProductPreview;
  addToCart: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
}

export interface ProductCardState {
  navigate: boolean;
}

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(addToCart({ id, selectedAttributes })),
});

export default connect(null, mapDispatchToProps)(ProductCard);
