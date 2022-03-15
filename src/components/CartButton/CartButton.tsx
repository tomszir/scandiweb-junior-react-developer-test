import { PureComponent } from "react";
import { connect } from "react-redux";
import { EmptyCartIcon } from "../../icons";
import { AppDispatch, RootState } from "../../store";
import { getItemCount, toggleOverlay } from "../../store/cartSlice";
import * as S from "./CartButton.style";

class CartButton extends PureComponent<CartButtonProps> {
  renderBadge = () => {
    const { cartItemCount } = this.props;

    if (cartItemCount <= 0) {
      return null;
    }

    return <S.Badge>{cartItemCount}</S.Badge>;
  };

  render() {
    const { toggleCartOverlay } = this.props;

    return (
      <S.Button id="cart-button" onClick={toggleCartOverlay}>
        <EmptyCartIcon />
        {this.renderBadge()}
      </S.Button>
    );
  }
}

export interface CartButtonProps {
  cartItemCount: number;
  toggleCartOverlay: () => void;
}

export const mapStateToProps = (state: RootState) => ({
  cartItemCount: getItemCount(state),
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleCartOverlay: () => dispatch(toggleOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartButton);
