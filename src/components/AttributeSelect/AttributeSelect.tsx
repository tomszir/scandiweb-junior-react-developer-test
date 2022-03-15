import { PureComponent } from "react";
import { CheckmarkIcon } from "../../icons";
import { Attribute, AttributeSet } from "../../types";
import * as S from "./AttributeSelect.style";

class AttributeSelect extends PureComponent<AttributeSelectProps> {
  renderAttributeSwatchButton = (attr: Attribute, i: number) => {
    const { set, onSelect, selectedAttributes } = this.props;

    const active = selectedAttributes[set.id]
      ? selectedAttributes[set.id] === attr.id
      : i === 0;

    console.log(!onSelect);

    return (
      <S.SwatchButton
        key={attr.id}
        active={active}
        color={attr.value}
        onClick={() => onSelect && onSelect(attr)}
        isDisabled={!onSelect}
      >
        {active && (
          <S.Icon>
            <CheckmarkIcon />
          </S.Icon>
        )}
      </S.SwatchButton>
    );
  };

  renderAttributeButton = (attr: Attribute, i: number) => {
    const { set, onSelect, selectedAttributes } = this.props;

    const active = selectedAttributes[set.id]
      ? selectedAttributes[set.id] === attr.id
      : i === 0;

    return (
      <S.Button
        key={attr.id}
        active={active}
        onClick={() => onSelect && onSelect(attr)}
        isDisabled={!onSelect}
      >
        {attr.value}
      </S.Button>
    );
  };

  renderAttributes() {
    const { set } = this.props;

    if (set.type === "swatch") {
      return set.items.map(this.renderAttributeSwatchButton);
    }

    return set.items.map(this.renderAttributeButton);
  }

  render() {
    return <S.Row>{this.renderAttributes()}</S.Row>;
  }
}

export interface AttributeSelectProps {
  set: AttributeSet;
  selectedAttributes: { [key: string]: string };
  onSelect?: (attr: Attribute) => void;
}

export default AttributeSelect;
