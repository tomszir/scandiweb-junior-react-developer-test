import { createRef, PureComponent } from "react";
import { connect } from "react-redux";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons";
import { AppDispatch, RootState } from "../../store";
import { setCurrency } from "../../store/currencySlice";
import { Currency } from "../../types";
import * as S from "./CurrencyDropdown.style";

class CurrencyDropdown extends PureComponent<
  CurrencyDropdownProps,
  CurrencyDropdwonState
> {
  state: CurrencyDropdwonState = {
    isOpen: false,
  };

  buttonRef = createRef<HTMLButtonElement>();
  dropdownRef = createRef<HTMLDivElement>();

  toggleOpen = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen,
    }));
  };

  onWindowClick = (e: MouseEvent) => {
    const { isOpen } = this.state;

    if (!isOpen) return;
    if (!e.target) return;
    if (this.buttonRef.current?.contains(e.target as HTMLElement)) return;
    if (this.dropdownRef.current?.contains(e.target as HTMLElement)) return;

    this.toggleOpen();
  };

  renderButton = () => {
    const {
      currentCurrency: { symbol },
    } = this.props;

    return (
      <S.CurrencyButton ref={this.buttonRef} onClick={this.toggleOpen}>
        {symbol}
        {this.renderChevron()}
      </S.CurrencyButton>
    );
  };

  renderDropdownItem = (currency: Currency) => {
    const { setCurrency } = this.props;
    const handleClick = () => {
      setCurrency(currency);
      this.toggleOpen();
    };

    return (
      <S.DropdownItem key={`${currency.label}`} onClick={handleClick}>
        {currency.symbol}
        {currency.label}
      </S.DropdownItem>
    );
  };

  renderDropdownItems = () => {
    const { currencies } = this.props;
    return currencies.map(this.renderDropdownItem);
  };

  renderChevron = () => {
    const { isOpen } = this.state;

    if (!isOpen) {
      return <ChevronDownIcon />;
    }

    return <ChevronUpIcon />;
  };

  renderDropdown = () => {
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return (
      <S.Dropdown ref={this.dropdownRef}>
        {this.renderDropdownItems()}
      </S.Dropdown>
    );
  };

  componentDidMount() {
    window.addEventListener("click", this.onWindowClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick, false);
  }

  render() {
    return (
      <S.Wrapper>
        {this.renderButton()}
        {this.renderDropdown()}
      </S.Wrapper>
    );
  }
}

export interface CurrencyDropdwonState {
  isOpen: boolean;
}

export interface CurrencyDropdownProps {
  currencies: Currency[];
  currentCurrency: Currency;
  setCurrency: (currency: Currency) => void;
}

export const mapStateToProps = (state: RootState) => ({
  currencies: state.currency.currencies,
  currentCurrency: state.currency.current,
});

export const mapDispatchToProps = (dispatch: AppDispatch) => ({
  setCurrency: (currency: Currency) => dispatch(setCurrency(currency)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyDropdown);
