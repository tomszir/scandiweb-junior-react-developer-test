import { createRef, PureComponent } from "react";
import * as S from "./ProductGallery.style";

class ProductGallery extends PureComponent<
  ProductGalleryProps,
  ProductGalleryState
> {
  state: ProductGalleryState = {
    currentItem: 0,
    overlayIsOpen: false,
  };

  openOverlay = (currentItem: number) => {
    this.setState({
      overlayIsOpen: true,
      currentItem,
    });
  };

  closeOverlay = () => {
    this.setState({
      overlayIsOpen: false,
    });
  };

  overlayImageRef = createRef<HTMLDivElement>();

  onWindowClick = (e: MouseEvent) => {
    if (!this.overlayImageRef.current) return;
    if (this.overlayImageRef.current.contains(e.target as HTMLElement)) return;
    if ((e.target as HTMLElement).tagName.toLowerCase() === "img") return;

    this.closeOverlay();
  };

  componentDidMount() {
    window.addEventListener("click", this.onWindowClick, false);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onWindowClick, false);
  }

  renderOverlay() {
    const { images } = this.props;
    const { currentItem, overlayIsOpen } = this.state;

    const next = () =>
      this.setState(({ currentItem }) => ({
        currentItem: (currentItem + 1) % images.length,
      }));

    const prev = () =>
      this.setState(({ currentItem }) => ({
        currentItem: currentItem - 1 < 0 ? images.length - 1 : currentItem - 1,
      }));

    if (!overlayIsOpen) {
      return null;
    }

    return (
      <S.Overlay>
        <S.CloseOverlayButton onClick={this.closeOverlay}>
          X
        </S.CloseOverlayButton>
        <S.OverlayImageWrapper ref={this.overlayImageRef}>
          <S.OverlayImage src={images[currentItem]} />
          {images.length > 1 && (
            <>
              <S.OverlayPrevButton onClick={prev} />
              <S.OverlayNextButton onClick={next} />
            </>
          )}
        </S.OverlayImageWrapper>
      </S.Overlay>
    );
  }

  render() {
    const { images } = this.props;

    return (
      <>
        <S.Gallery>
          {images.length > 0 && (
            <S.ThumbnailList>
              {images.slice(1).map((img, i) => {
                return (
                  <S.Thumbnail
                    src={img}
                    onClick={() => this.openOverlay(i + 1)}
                  />
                );
              })}
            </S.ThumbnailList>
          )}
          <S.BigThumbnail src={images[0]} onClick={() => this.openOverlay(0)} />
        </S.Gallery>
        {this.renderOverlay()}
      </>
    );
  }
}

export interface ProductGalleryProps {
  images: string[];
}

export interface ProductGalleryState {
  currentItem: number;
  overlayIsOpen: boolean;
}

export default ProductGallery;
