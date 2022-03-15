import { createRef, PureComponent } from "react";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  getItemCount,
  getItemTotalCost,
  getPricedCartItems,
  toggleOverlay,
} from "../../store/cartSlice";
import { Currency, PricedCartItem } from "../../types";
import CartOverlayProduct from "../CartOverlayProduct";
import * as S from "./CartOverlay.style";

class CartOverlay extends PureComponent<CartOverlayProps> {
  dropdownRef = createRef<HTMLDivElement>();

  // Handles clicks outside of dropdown or icon
  onWindowClick = (e: MouseEvent) => {
    const { dropdownRef } = this;
    const { toggleCartOverlay } = this.props;

    const targetEl = e.target as HTMLElement;

    if (!e.target) return;
    if (!dropdownRef.current) return;

    const { bottom, left, right } = dropdownRef.current.getBoundingClientRect();

    if (bottom > e.clientY && e.clientX > left && e.clientX < right) return;
    if (e.clientY > 80 && targetEl.tagName.toLowerCase() === "button") return;

    toggleCartOverlay();
  };

  renderHeader() {
    const { cartItemCount } = this.props;

    return (
      <S.Heading>
        My Bag, <span>{cartItemCount} items</span>
      </S.Heading>
    );
  }

  renderProducts() {
    const { cart } = this.props;

    if (cart.length === 0) {
      return this.renderEmptyProducts();
    }

    return (
      <S.ItemList>
        {cart.map((item) => {
          return (
            <CartOverlayProduct
              key={
                item.product.id +
                Object.values(item.selectedAttributes).toString()
              }
              {...item}
            />
          );
        })}
      </S.ItemList>
    );
  }

  renderEmptyProducts() {
    return <div>Looks like your cart is empty...</div>;
  }

  renderFooter() {
    const { currentCurrency, cartItemTotalCost, toggleCartOverlay } =
      this.props;

    return (
      <footer>
        <S.TotalRow>
          <span>Total</span>
          <span>
            {currentCurrency.symbol}
            {cartItemTotalCost.toFixed(2)}
          </span>
        </S.TotalRow>
        <S.ButtonRow>
          <S.LinkButton to="/cart" onClick={toggleCartOverlay}>
            View Bag
          </S.LinkButton>
          <S.PrimaryButton>Checkout</S.PrimaryButton>
        </S.ButtonRow>
      </footer>
    );
  }

  renderDropdown() {
    return (
      <S.DropdownWrapper>
        <S.Dropdown ref={this.dropdownRef}>
          {this.renderHeader()}
          {this.renderProducts()}
          {this.renderFooter()}
        </S.Dropdown>
        <S.Spacer />
      </S.DropdownWrapper>
    );
  }

  componentDidMount() {
    document.addEventListener("click", this.onWindowClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onWindowClick, false);
  }

  render() {
    return (
      <S.Overlay>
        <S.Wrapper>{this.renderDropdown()}</S.Wrapper>
      </S.Overlay>
    );
  }
}

export interface CartOverlayProps {
  cart: PricedCartItem[];
  cartItemCount: number;
  cartItemTotalCost: number;
  currentCurrency: Currency;
  toggleCartOverlay: () => void;
}

export const mapStateToProps = (state: RootState) => ({
  cart: getPricedCartItems(state),
  cartItemCount: getItemCount(state),
  cartItemTotalCost: getItemTotalCost(state),
  currentCurrency: state.currency.current,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  toggleCartOverlay: () => dispatch(toggleOverlay()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);
