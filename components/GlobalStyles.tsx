import { createGlobalStyle, css } from 'styled-components'

export const fontFamily = "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
export const placeholderColor = 'rgba(255, 255, 255, 0.3)'
export const GlobalStyles = createGlobalStyle<{ route: string }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    --highlight: 0, 122, 255;
    --background: #282C34;
    --background-l2: #32363E;
    --error: #fa755a;
    --placeholder: ${placeholderColor};
    --input-border-radius: 2px;
    font-family: ${fontFamily};
    font-size: 12px;
  }
  body, #__next {
    min-height: 100vh;
    //overflow: hidden;
    color: white;
    background: var(--background);
    ${p => p.route?.includes('/screenshot/') && screenshot}
  }
  a {
    text-decoration: none;
    color: #0097ff;
    :hover {
      background: rgb(var(--highlight));
      color: white;
    }
  }
  p {
    line-height: 150%;
  }
  h3 {
    font-weight: 400;
  }
  h1, h2, h3, h4, h5, h6 {
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 0.75px;
  }
  h4 {
    font-size: 11px;
  }
  svg {
    display: block;
  }
  button {
    font-size: 11px;
    font-family: inherit;
    text-transform: uppercase;
    font-weight: 200;
    letter-spacing: 0.5px;
  }
`

const screenshot = css`
  min-height: unset;
  overflow: auto;
  p {
    line-height: unset;
  }
`
