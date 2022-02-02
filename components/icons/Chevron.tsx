import styled from 'styled-components'
import { FC } from 'react'

type Props = {
  [key: string]: any
  dir?: 'down' | 'up' | 'left' | 'right'
}

export const Chevron: FC<Props> = ({ dir = 'down', ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}>
      <Path dir={dir} d="M 6 9 L 12 15 L 18 9" />
    </svg>
  )
}

type StyleProps = Pick<Props, 'dir'>
const getRotation = ({ dir }: StyleProps) => {
  switch (dir) {
    case 'right':
      return -90
    case 'left':
      return 90
    case 'up':
      return 180
    default:
      0
  }
}
const Path = styled.path<StyleProps>`
  transform-origin: center center;
  transform: rotate(${getRotation}deg);
`
