import styled from "styled-components";

export const Wrapper = styled.div`
  position: relative;
`;

export const Buttons = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
`;

export const Button = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background-color: #fff;
  border: 1px solid #000;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
