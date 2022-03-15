import styled from "styled-components";

export const Gallery = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
`;

export const ThumbnailList = styled.div`
  width: 100px;
  display: flex;
  gap: 12px;
  flex-direction: column;
`;

export const Thumbnail = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const BigThumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000000;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CloseOverlayButton = styled.button`
  position: absolute;
  cursor: pointer;

  width: 64px;
  height: 64px;
  border: 1px solid #000;

  top: 32px;
  right: 32px;

  font-size: 24px;
  z-index: 999999;
  background-color: #fff;
`;

export const OverlayImageWrapper = styled.div`
  position: relative;
  height: 100%;
`;

export const OverlayPrevButton = styled.button`
  position: absolute;
  width: 50%;
  cursor: pointer;
  left: 0;
  top: 0;
  bottom: 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background-color: transparent;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const OverlayNextButton = styled(OverlayPrevButton)`
  left: auto;
  right: 0;
`;

export const OverlayImage = styled.img`
  height: 100%;
  margin: 0 auto;
`;
