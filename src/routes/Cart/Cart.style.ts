import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  padding: 0 32px;
  margin: 0 auto;
`;
export const Heading = styled.h1`
  text-transform: uppercase;
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 80px;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 160px;
  column-gap: 16px;
  padding: 16px 0;
  border-top: 1px solid #e5e5e5;
`;

export const Description = styled.div`
  flex: 1;
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
  margin-top: 12px;
  font-weight: 700;
`;

export const CountRow = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  font-weight: 500;
`;

export const Thumbnail = styled.img`
  height: 100%;
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
`;

export const Label = styled.span`
  width: 100%;
  margin-top: 18px;
  display: inline-block;
  font-size: 16px;
  line-height: 16px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;

  &::after {
    content: ":";
  }
`;

export const CountButton = styled.button`
  outline: none;
  cursor: pointer;

  color: #000;
  min-width: 32px;
  height: 32px;
  display: flex;
  font-size: 24px;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  background-color: transparent;
`;
