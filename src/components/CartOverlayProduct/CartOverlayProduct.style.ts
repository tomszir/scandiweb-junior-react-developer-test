import styled, { css } from "styled-components";

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 100px;
  column-gap: 12px;
`;

export const Wrapper = styled.div``;

export const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
`;
export const Brand = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
export const AmountRow = styled.div`
  height: 100%;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.h2`
  font-weight: 300;
  font-size: 16px;
  line-height: 160%;
`;

export const Price = styled.span`
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
`;

export const DetailsRow = styled.div`
  flex: 1;
  height: 100%;
`;

export const AttributeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const AttributeName = styled.span`
  font-size: 12px;
  margin-bottom: 4px;
  display: inline-block;
`;
export const AttributeRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const SmallAttribute = styled.div<{ active?: boolean }>`
  outline: none;

  color: #000;
  min-width: 24px;
  height: 24px;
  padding: 0 8px;
  display: flex;
  font-size: 12px;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  background-color: transparent;
  opacity: 0.7;

  ${({ active }) =>
    active &&
    css`
      background-color: #000;
      color: #fff;
      opacity: 1;
    `}
`;

export const Icon = styled.div`
  width: 16px;
  height: 16px;
  background-color: #000;
  border-radius: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 8px;
    height: 8px;
    fill: #fff;
  }
`;

export const CountButton = styled.button`
  outline: none;
  cursor: pointer;

  color: #000;
  min-width: 24px;
  height: 24px;
  display: flex;
  font-size: 22px;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  background-color: transparent;
`;

export const SmallSwatchAttribute = styled.div<{
  active?: boolean;
  color?: string;
}>`
  outline: none;

  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  background-color: ${({ color }) => color};

  ${({ active }) => active && css``}
`;
