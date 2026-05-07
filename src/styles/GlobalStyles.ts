import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    flex: 1;
  }

  body {
    font-family: var(--font);
    font-size: var(--body-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
    background-color: var(--bg);
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;
