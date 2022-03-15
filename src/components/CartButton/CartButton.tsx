import { PureComponent } from "react";
import { connect } from "react-redux";
import { EmptyCartIcon } from "../../icons";
import { AppDispatch, RootState } from "../../store";
import { toggleOverlay } from "../../store/cartSlice";
import { CartItem } from "../../types";
import * as S from "./CartButton.style";

class CartButton extends PureComponent<CartButtonProps> {
  renderBadge = () => {
    const { cart } = this.props;

    if (cart.length <= 0) {
      return null;
    }

    return <S.Badge>{cart.length}</S.Badge>;
  };

  render() {
    const { toggleCartOverlay } = this.props;

    return (
      <S.Button onClick={toggleCartOverlay}>
        <EmptyCartIcon />
        {this.renderBadge()}
      </S.Button>
    );
  }
}

export interface CartButtonProps {
  cart: CartItem[];
  toggleCartOverlay: () => void;
}

export const mapStateToProps = (state: RootState) => ({
  cart: state.cart.items,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleCartOverlay: () => dispatch(toggleOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
