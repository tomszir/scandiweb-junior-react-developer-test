import { Link } from "react-router-dom";
import styled from "styled-components";

export const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100000;
  position: absolute;
  min-height: 80vh;
  height: 100%;
`;

export const Wrapper = styled.div`
  max-width: 1440px;
  width: 100%;
  padding: 0 32px;
  position: relative;
  padding-bottom: 32px;
  margin: 0 auto;
  height: 100%;
`;

export const Spacer = styled.div`
  width: 100%;
  height: 80px;
`;

export const DropdownWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 340px;
  right: 0;
`;

export const Dropdown = styled.div`
  background-color: #fff;

  padding: 12px;
`;

export const Heading = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;

  span {
    font-weight: 500;
  }
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 24px;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 32px 0;
  font-weight: 700;
  font-size: 16px;
  color: #000;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const LinkButton = styled(Link)`
  flex: 1;
  cursor: pointer;
  display: flex;
  justify-content: center;
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #000;
  color: #000;
  background-color: transparent;
`;

export const PrimaryButton = styled.button`
  flex: 1;
  cursor: pointer;
  text-transform: uppercase;
  padding: 10px 28px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid #000;
  color: #fff;
  background-color: ${({ theme }) => theme.colors.primary};
  border-color: transparent;
`;
