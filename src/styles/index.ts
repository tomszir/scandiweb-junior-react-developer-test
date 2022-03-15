import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  html {
    font-size: 16px;
    background-color: rgba(0,0,0,0.3);
  }

  #root {
    background-color: #fff;
  }

  html,
  body,
  #root {
    min-height: 100%;
  }
`;
