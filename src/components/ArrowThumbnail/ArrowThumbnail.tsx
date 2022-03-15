import { PureComponent } from "react";
import * as S from "./ArrowThumbnail.style";

class ArrowThumbnail extends PureComponent<
  ArrowThumbnailProps,
  ArrowThumbnailState
> {
  state: ArrowThumbnailState = {
    currentItem: 0,
  };

  renderButtons() {
    const { images } = this.props;

    if (images.length <= 1) {
      return null;
    }

    const incerement = () =>
      this.setState(({ currentItem }) => ({
        currentItem: (currentItem + 1) % images.length,
      }));

    const decrement = () =>
      this.setState(({ currentItem }) => ({
        currentItem: currentItem - 1 < 0 ? images.length - 1 : currentItem - 1,
      }));

    return (
      <S.Buttons>
        <S.Button onClick={incerement}>{"<"}</S.Button>
        <S.Button onClick={decrement}>{">"}</S.Button>
      </S.Buttons>
    );
  }

  render() {
    const { images } = this.props;
    const { currentItem } = this.state;

    return (
      <S.Wrapper>
        <S.Image src={images[currentItem]} />
        {this.renderButtons()}
      </S.Wrapper>
    );
  }
}

export interface ArrowThumbnailProps {
  images: string[];
}

export interface ArrowThumbnailState {
  currentItem: number;
}

export default ArrowThumbnail;
