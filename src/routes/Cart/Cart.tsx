import { PureComponent } from "react";
import { connect } from "react-redux";
import ArrowGallery from "../../components/ArrowThumbnail";
import AttributeSelect from "../../components/AttributeSelect";
import { AppDispatch, RootState } from "../../store";
import {
  decrementItem,
  getPricedCartItems,
  incrementItem,
} from "../../store/cartSlice";
import { PricedCartItem } from "../../types";
import * as S from "./Cart.style";

class Cart extends PureComponent<CartProps> {
  renderItem = (item: PricedCartItem) => {
    const { product, amount, selectedAttributes } = item;
    const { incrementItem, decrementItem } = this.props;

    const onIncrement = () => incrementItem(product.id, selectedAttributes);
    const onDecrement = () => decrementItem(product.id, selectedAttributes);

    return (
      <S.Item key={product.id + Object.values(selectedAttributes).toString()}>
        <S.Description>
          <S.Brand>{product.brand}</S.Brand>
          <S.Name>{product.name}</S.Name>
          <S.Price>
            {product.price.currency.symbol}
            {product.price.amount}
          </S.Price>
          {product.attributes.map((set) => {
            return (
              <div key={set.name}>
                <S.Label>{set.name}</S.Label>
                <AttributeSelect
                  set={set}
                  selectedAttributes={selectedAttributes}
                />
              </div>
            );
          })}
        </S.Description>
        <S.CountRow>
          <S.CountButton onClick={onIncrement}>{"+"}</S.CountButton>
          {amount}
          <S.CountButton onClick={onDecrement}>{"-"}</S.CountButton>
        </S.CountRow>
        <S.Thumbnail>
          <ArrowGallery images={product.gallery} />
        </S.Thumbnail>
      </S.Item>
    );
  };

  renderItems() {
    const { cart } = this.props;

    if (cart.length === 0) {
      return <div>Looks like your cart is empty right now...</div>;
    }

    return cart.map(this.renderItem);
  }

  render() {
    return (
      <S.Container>
        <S.Heading>Cart</S.Heading>
        <S.ItemList>{this.renderItems()}</S.ItemList>
      </S.Container>
    );
  }
}

export interface CartProps {
  cart: PricedCartItem[];
  incrementItem: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
  decrementItem: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
}

export const mapStateToProps = (state: RootState) => ({
  cart: getPricedCartItems(state),
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  incrementItem: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(incrementItem({ id, selectedAttributes })),
  decrementItem: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(decrementItem({ id, selectedAttributes })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
