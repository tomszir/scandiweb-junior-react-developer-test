import { PureComponent } from "react";
import { connect } from "react-redux";
import { BrandIcon } from "../../icons";
import { RootState } from "../../store";
import { getCategoryNames } from "../../store/categorySlice";
import CartButton from "../CartButton";
import CurrencyDropdown from "../CurrencyDropdown";
import * as S from "./Nav.style";

class Nav extends PureComponent<NavProps> {
  renderLinks() {
    const { categories } = this.props;

    return (
      <S.Left>
        {categories.map((category) => {
          return (
            <S.Link key={category} to={category}>
              {category}
            </S.Link>
          );
        })}
      </S.Left>
    );
  }

  renderRighSide = () => {
    return (
      <S.Right>
        <CurrencyDropdown />
        <CartButton />
      </S.Right>
    );
  };

  render() {
    return (
      <S.Wrapper>
        {this.renderLinks()}
        <BrandIcon />
        {this.renderRighSide()}
      </S.Wrapper>
    );
  }
}

export interface NavProps {
  categories: string[];
}

export const mapStateToProps = (state: RootState) => ({
  categories: getCategoryNames(state),
});

export default connect(mapStateToProps)(Nav);
