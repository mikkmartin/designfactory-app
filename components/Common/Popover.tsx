import { FC } from 'react'
import * as Radix from '@radix-ui/react-popover'
import styled from 'styled-components'

export const Popover = Radix.Root

export const Trigger = ({ children }) => {
  return <Radix.Trigger asChild>{children}</Radix.Trigger>
}

export const Content = ({ children }) => {
  return (
    <Container alignOffset={93} sideOffset={-20}>
      <Arrow offset={16} />
      {children}
    </Container>
  )
}

const Arrow = styled(Radix.Arrow)`
  height: 8px;
  width: 16px;
  margin-top: -1px;
  filter: drop-shadow( 0 1px 0 rgba(255, 255, 255, 0.1));
  polygon {
    fill: #282c34;
  }
`

const Container = styled(Radix.Content)`
  background: #282c34;
  position: fixed;
  width: 300px;
  border-radius: 4px;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.5), inset 0px 0px 1px rgba(255, 255, 255, 0.5);
`
