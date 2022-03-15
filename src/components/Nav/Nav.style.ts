import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Wrapper = styled.nav`
  width: 100%;
  background-color: #fff;
`;

export const Container = styled.div`
  height: 80px;
  max-width: 1440px;
  padding: 0 32px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  justify-content: space-between;
`;

export const Left = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
`;

export const Right = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
`;

export const Link = styled(NavLink)`
  height: 100%;
  padding: 0 16px;
  color: ${({ theme }) => theme.colors.text};

  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: center;

  border-bottom: 2px solid transparent;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
