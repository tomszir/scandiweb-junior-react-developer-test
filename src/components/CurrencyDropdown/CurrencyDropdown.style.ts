import styled from "styled-components";

export const Dropdown = styled.div`
  flex-direction: column;
  width: auto;
  right: 0;
  top: 100%;
  width: 80px;
  position: absolute;
  z-index: 10000;
  box-shadow: 0 4px 35px rgba(0, 0, 0, 0.19);
  background-color: #fff;
`;

export const DropdownItem = styled.button`
  padding: 12px 20px;
  text-align: left;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  border: none;
  font-weight: 500;
  width: 100%;
`;

export const Symbol = styled.span`
  width: 24px;
  display: inline-block;
`;

export const CurrencyButton = styled.button`
  height: 32px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 12px;
  font-size: 18px;
  display: flex;
  align-items: center;

  svg {
    margin-left: 6px;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
`;
