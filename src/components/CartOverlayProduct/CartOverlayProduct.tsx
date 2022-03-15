import { PureComponent } from "react";
import { connect } from "react-redux";
import { CheckmarkIcon } from "../../icons";
import { AppDispatch } from "../../store";
import {
  decrementItem,
  incrementItem,
  setActiveAttribute,
} from "../../store/cartSlice";
import { Attribute, AttributeSet, PricedProduct } from "../../types";
import * as S from "./CartOverlayProduct.style";

class CartOverlayProduct extends PureComponent<CartOverlayProductProps> {
  setActiveAttribute = (set: AttributeSet, attr: Attribute) => {
    const { product, setActiveAttribute } = this.props;
    setActiveAttribute(product.id, set.id, attr.id);
  };

  renderAttributeButton = (set: AttributeSet, attr: Attribute) => {
    const { selectedAttributes } = this.props;

    return (
      <S.SmallButton
        active={selectedAttributes[set.id] === attr.id}
        onClick={() => this.setActiveAttribute(set, attr)}
      >
        {attr.value}
      </S.SmallButton>
    );
  };

  renderAttributeSwatchButton = (set: AttributeSet, attr: Attribute) => {
    const { selectedAttributes } = this.props;
    const active = selectedAttributes[set.id] === attr.id;

    return (
      <S.SmallSwatchButton
        color={attr.value}
        active={active}
        onClick={() => this.setActiveAttribute(set, attr)}
      >
        {active && (
          <S.Icon>
            <CheckmarkIcon />
          </S.Icon>
        )}
      </S.SmallSwatchButton>
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
      <div>
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
    const { product, amount, incrementItem, decrementItem } = this.props;

    return (
      <S.AmountRow>
        <S.SmallButton onClick={() => incrementItem(product.id)}>
          {"+"}
        </S.SmallButton>
        {amount}
        <S.SmallButton onClick={() => decrementItem(product.id)}>
          {"-"}
        </S.SmallButton>
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
  setActiveAttribute: (
    id: string,
    attributeId: string,
    attributeItemId: string
  ) => void;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
}

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setActiveAttribute: (
    id: string,
    attributeId: string,
    attributeItemId: string
  ) => dispatch(setActiveAttribute({ id, attributeId, attributeItemId })),
  incrementItem: (id: string) => dispatch(incrementItem(id)),
  decrementItem: (id: string) => dispatch(decrementItem(id)),
});

export default connect(null, mapDispatchToProps)(CartOverlayProduct);
