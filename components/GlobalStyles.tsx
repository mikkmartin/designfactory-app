import { createGlobalStyle } from 'styled-components'

export const fontFamily = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
export const placeholderColor = 'rgba(255, 255, 255, 0.3)'
export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --highlight: #007AFF;
    --background: #282C34;
    --error: #fa755a;
    --placeholder: ${placeholderColor};
    font-family: ${fontFamily};
    font-size: 12px;
  }
  body, #__next {
    min-height: 100vh;
    overflow: hidden;
    color: white;
  }
  a {
    text-decoration: none;
    color: #0097ff;
    :hover {
      background: var(--highlight);
      color: white;
    }
  }
  p {
    line-height: 150%;
  }
  h3 {
    font-weight: 400;
  }
  input {
    border: 0;
    font-family: inherit;
    font-size: 14px;
    color: white;
    background: rgba(255, 255, 255, 0.05);
    caret-color: var(--highlight);
    &:hover {
      background: rgba(255, 255, 255, 0.075);
    }
    &::placeholder {
      color: var(--placeholder);
    }
    &:focus {
      background: rgba(255, 255, 255, 0.1);
      outline: none;
    }
    position: relative;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`
