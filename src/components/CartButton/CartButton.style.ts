import styled from "styled-components";

export const Button = styled.button`
  height: 32px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 16px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const Badge = styled.div`
  border-radius: 100%;
  position: absolute;
  top: -2px;
  right: 2px;
  width: 20px;
  height: 20px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 13px;
  background-color: ${({ theme }) => theme.colors.text};
`;
