import { PureComponent } from "react";
import { connect } from "react-redux";
import { BrandIcon } from "../../icons";
import { RootState } from "../../store";
import CartButton from "../CartButton";
import CurrencyDropdown from "../CurrencyDropdown";
import * as S from "./Nav.style";

class Nav extends PureComponent<NavProps> {
  renderLinks() {
    const { categoryNames } = this.props;

    return (
      <S.Left>
        {categoryNames.map((category) => {
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
        <S.Container>
          {this.renderLinks()}
          <BrandIcon />
          {this.renderRighSide()}
        </S.Container>
      </S.Wrapper>
    );
  }
}

export interface NavProps {
  categoryNames: string[];
}

export const mapStateToProps = (state: RootState) => ({
  categoryNames: state.categories.categoryNames,
});

export default connect(mapStateToProps)(Nav);
