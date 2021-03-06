import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 0 32px;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  row-gap: 48px;

  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 668px) {
    grid-template-columns: 1fr;
  }
`;

export const Heading = styled.h1`
  text-transform: capitalize;
  font-size: 42px;
  font-weight: 400;
  margin-bottom: 80px;
`;
