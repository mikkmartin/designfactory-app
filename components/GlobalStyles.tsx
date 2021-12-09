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
    --error: #fa755a;
    --placeholder: ${placeholderColor};
    font-family: ${fontFamily};
    font-size: 12px;
  }
  body, #__next {
    min-height: 100vh;
    overflow: hidden;
    color: white;
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
`

const screenshot = css`
  min-height: unset;
  overflow: auto;
  p {
    line-height: unset;
  }
`
