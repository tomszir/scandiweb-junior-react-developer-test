import styled, { css } from "styled-components";

export const Thumbnail = styled.img`
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const Name = styled.h2`
  font-size: 18px;
  font-weight: 300;
  line-height: 160%;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
`;

export const Price = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CartButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 12px;
  height: 52px;
  width: 52px;
  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: none;
  border-radius: 100%;
  svg {
    fill: #fff;
  }
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Card = styled.div<{ inStock: boolean }>`
  width: 100%;
  padding: 16px;

  &:hover {
    box-shadow: 0 4px 35px rgba(0, 0, 0, 0.19);
  }

  ${(p) =>
    !p.inStock
      ? css`
          opacity: 0.5;

          ${ThumbnailWrapper}::after {
            content: "OUT OF STOCK";
            display: block;
            font-size: 24px;
            font-weight: 400px;
            color: black;
            position: absolute;
            pointer-events: none;
          }
        `
      : css`
          &:hover ${CartButton} {
            display: flex;
          }
        `}
`;
