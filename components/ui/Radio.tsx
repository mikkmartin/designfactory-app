import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { motion } from 'framer-motion'
import { fast } from 'lib/static/transitions'
import styled, { css } from 'styled-components'

export const Group = ({ children, ...rest }) => <Container {...rest}>{children}</Container>

const Container = styled(motion(Root))`
  display: flex;
  padding: 2px;
  gap: 3px;
  width: 100%;
  min-height: 40px;
  justify-content: stretch;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 4px;
`

export const Button = ({ value = null, children }) => (
  <ButtonContainer value={value} id={value}>
    <StyledIndicator>
      <motion.div transition={fast} layoutId="highlight" />
    </StyledIndicator>
    <div>{children}</div>
  </ButtonContainer>
)

const ButtonContainer = styled(motion(Item))`
  padding: 1rem;
  position: relative;
  background: none;
  color: inherit;
  flex: 1;
  min-width: 56px;
  font-family: inherit;
  border: none;
  border-radius: 4px;
  &:focus-visible {
    outline: none;
    > span > div {
      background: rgb(172, 230, 255, 0.1);
      box-shadow: 0 0 0 1px rgb(var(--highlight));
    }
  }
  > div {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    cursor: pointer;
    transition: transform 0.1s ease-out;
    &:active {
      transform: scale(0.8);
      transition: transform 0s;
    }
    &:hover {
      opacity: 1;
    }
  }
`

export const buttonHighlight = css`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
  transition: background-color 0.1s, box-shadow 0.1s;
`

const StyledIndicator = styled(Indicator)`
  position: absolute;
  inset: 0;
  > div {
    ${buttonHighlight}
  }
  + div {
    opacity: 1;
  }
`
