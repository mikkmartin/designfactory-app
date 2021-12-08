import { FC } from 'react'
import {
  Root,
  Trigger as RadixTrigger,
  Anchor,
  Content as RadixContent,
  Close,
  Arrow,
} from '@radix-ui/react-popover'

export const Popover: FC = ({ children }) => <Root>{children}</Root>

export const Trigger = ({ children }) => {
  return <RadixTrigger asChild>{children}</RadixTrigger>
}

export const Content = ({ children }) => {
  return (
    <RadixContent>
      <Close />
      <Arrow />
      <Anchor />
      {children}
    </RadixContent>
  )
}
