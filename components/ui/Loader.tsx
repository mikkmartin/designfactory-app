import styled from 'styled-components'

export const Loader = () => {
  return (
    <Container
      width="24"
      height="24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <circle className="bg" cx="12" cy="12" r="10" />
      <circle className="fg" cx="12" cy="12" r="10" />
    </Container>
  )
}

const Container = styled.svg`
  circle {
    fill: none;
  }
  .fg {
    transform-origin: 50% 50%;
    stroke-dasharray: 20, 61;
    animation: dash 0.25s linear infinite;
    stroke: rgb(var(--highlight));
  }
  .bg {
    stroke: rgba(255, 255, 255, 0.1);
  }
  @keyframes dash {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
