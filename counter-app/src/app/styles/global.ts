import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap');

  :root {
    /* Colors — palette */
    --white: #ffffff;
    --grey-10: #f7f8f9;
    --grey-25: #f2f5f8;
    --grey-50: #f0f3f7;
    --grey-100: #e8e8e8;
    --grey-200: #e0e5eb;
    --grey-300: #ced5de;
    --grey-400: #9da6b4;
    --grey-600: #5e6674;
    --grey-800: #2d3348;
    --grey-900: #1f2939;

    --red-100: #fee3e3;
    --red-200: #fed7d7;

    /* Colors — semantic */
    --bg: var(--white);

    --text-primary: var(--grey-900);
    --text-secondary: var(--grey-600);
    --delete-button: var(--red-100);
    --delete-button-hover: var(--red-200);
    --disabled-delete-button: var(--grey-400);
    --button-border: var(--grey-300);
    --button-active-bg: var(--grey-25);
    --button-hover-bg: var(--grey-200);

    /* Typography — font */
    --font: Roboto, system-ui, sans-serif;

    /* Typography — body */
    --body-size: 14px;
    --body-weight: 400;
    --body-line-height: 20px;

    /* Typography — heading */
    --h-weight: 500;

    /* Typography — heading 2 */
    --h2-size: 24px;
    --h2-line-height: 32px;

    /* Typography — heading 4 */
    --h4-size: 13px;
    --h4-line-height: 16px;

    /* Typography — button */
    --button-size: 14px;
    --button-weight: 400;

    /* Table */
    --table-header-bg: var(--grey-50);
    --table-header-border: var(--grey-200);
    --table-cell-color: var(--grey-800);
    --table-border: var(--grey-100);
  }

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

