import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  :root {
    font-family: 'SFMono-Regular',Consolas,'Liberation Mono',Menlo,Courier,monospace;
    --highlight: #0097ff;
    font-size: 12px;
  }
  body, #__next {
    min-height: 100vh;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    color: #0097ff;
    :hover {
      background: #0097ff;
      color: white;
    }
  }
`
