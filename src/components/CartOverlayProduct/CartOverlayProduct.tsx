import { PureComponent } from "react";
import { connect } from "react-redux";
import { CheckmarkIcon } from "../../icons";
import { AppDispatch } from "../../store";
import { decrementItem, incrementItem } from "../../store/cartSlice";
import { Attribute, AttributeSet, PricedProduct } from "../../types";
import * as S from "./CartOverlayProduct.style";

class CartOverlayProduct extends PureComponent<CartOverlayProductProps> {
  renderAttributeButton = (set: AttributeSet, attr: Attribute) => {
    const { selectedAttributes } = this.props;

    return (
      <S.SmallAttribute
        key={attr.id}
        active={selectedAttributes[set.id] === attr.id}
      >
        {attr.value}
      </S.SmallAttribute>
    );
  };

  renderAttributeSwatchButton = (set: AttributeSet, attr: Attribute) => {
    const { selectedAttributes } = this.props;
    const active = selectedAttributes[set.id] === attr.id;

    return (
      <S.SmallSwatchAttribute key={attr.id} color={attr.value} active={active}>
        {active && (
          <S.Icon>
            <CheckmarkIcon />
          </S.Icon>
        )}
      </S.SmallSwatchAttribute>
    );
  };

  renderAttributeButtons = (set: AttributeSet) => {
    if (set.type === "swatch") {
      return set.items.map((attr) =>
        this.renderAttributeSwatchButton(set, attr)
      );
    }

    return set.items.map((attr) => this.renderAttributeButton(set, attr));
  };

  renderAttribute = (set: AttributeSet) => {
    return (
      <div key={set.name}>
        <S.AttributeName>{set.name}</S.AttributeName>
        <S.AttributeRow>{this.renderAttributeButtons(set)}</S.AttributeRow>
      </div>
    );
  };

  renderAttributeList() {
    const { product } = this.props;

    return (
      <S.AttributeList>
        {product.attributes.map((set) => this.renderAttribute(set))}
      </S.AttributeList>
    );
  }

  renderDetails() {
    const { product } = this.props;
    const { price } = product;

    return (
      <S.DetailsRow>
        <S.Name>{product.name}</S.Name>
        <S.Price>
          {price.currency.symbol}
          {price.amount}
        </S.Price>
        {this.renderAttributeList()}
      </S.DetailsRow>
    );
  }

  renderAmountButtons() {
    const {
      product,
      amount,
      selectedAttributes,
      incrementItem,
      decrementItem,
    } = this.props;

    const onIncrement = () => incrementItem(product.id, selectedAttributes);
    const onDecrement = () => decrementItem(product.id, selectedAttributes);

    return (
      <S.AmountRow>
        <S.CountButton onClick={onIncrement}>{"+"}</S.CountButton>
        {amount}
        <S.CountButton onClick={onDecrement}>{"-"}</S.CountButton>
      </S.AmountRow>
    );
  }

  render() {
    const { product } = this.props;

    return (
      <S.Wrapper>
        <S.Content>
          {this.renderDetails()}
          {this.renderAmountButtons()}
          <S.Thumbnail src={product.gallery[0]} />
        </S.Content>
      </S.Wrapper>
    );
  }
}

export interface CartOverlayProductProps {
  product: PricedProduct;
  amount: number;
  selectedAttributes: { [key: string]: string };
  incrementItem: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
  decrementItem: (
    id: string,
    selectedAttributes: { [key: string]: string }
  ) => void;
}

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  incrementItem: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(incrementItem({ id, selectedAttributes })),
  decrementItem: (id: string, selectedAttributes: { [key: string]: string }) =>
    dispatch(decrementItem({ id, selectedAttributes })),
});

export default connect(null, mapDispatchToProps)(CartOverlayProduct);
