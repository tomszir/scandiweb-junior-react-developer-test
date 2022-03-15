import styled, { css } from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  padding: 0 32px;
  margin: 0 auto;
  display: grid;
  gap: 80px;
  grid-template-columns: auto 40%;
`;

export const ThumbnailGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 16px;
`;

export const DescriptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 16px;
  max-width: 160px;
  min-width: 50px;
`;

export const Thumbnail = styled.img`
  aspect-ratio: 1;
  flex: 1;
  object-fit: cover;
`;

export const BigThumbnail = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
`;

export const Brand = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 16px;
`;

export const Name = styled.h1`
  font-size: 30px;
  font-weight: 400;
`;

export const Price = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 24px;
  font-weight: 700;
`;

export const Label = styled.span`
  width: 100%;
  display: inline-block;
  font-size: 18px;
  line-height: 18px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
  &::after {
    content: ":";
  }
`;

export const CartButton = styled.button<{ inStock?: boolean }>`
  width: 100%;
  display: flex;
  outline: none;
  border: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  text-transform: uppercase;
  padding: 16px 32px;
  font-weight: 600;
  font-size: 16px;

  ${({ inStock }) =>
    !inStock &&
    css`
      opacity: 0.3;
      cursor: not-allowed;
    `}
`;

export const Description = styled.div`
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 159.96%;
  }

  & > * {
    &:first-child {
      margin-bottom: 12px;
    }
    & + * {
      margin-bottom: 12px;
    }
  }
`;
