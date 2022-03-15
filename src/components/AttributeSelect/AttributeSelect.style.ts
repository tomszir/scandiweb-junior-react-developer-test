import styled, { css } from "styled-components";

export const Row = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

export const Button = styled.button<{ active?: boolean; isDisabled?: boolean }>`
  outline: none;

  color: #000;
  padding: 14px 28px;
  display: flex;
  font-size: 16px;
  align-items: center;
  cursor: pointer;
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

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;
      pointer-events: none;
      opacity: 0.8;
    `}
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  svg {
    fill: #fff;
    width: 14px;
    height: 14px;
  }
`;

export const SwatchButton = styled.button<{
  active?: boolean;
  isDisabled?: boolean;
  color: string;
}>`
  outline: none;
  display: flex;
  font-size: 16px;
  align-items: center;
  cursor: pointer;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.text};
  background-color: transparent;
  width: 48px;
  height: 48px;
  background-color: ${({ color }) => color};
  position: relative;

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      cursor: default;
      pointer-events: none;
      opacity: 0.8;
    `}

  ${({ active }) =>
    active &&
    css`
      opacity: 1;
    `}
`;
