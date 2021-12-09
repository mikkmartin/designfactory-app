import { Root, Item, Indicator } from '@radix-ui/react-radio-group'
import { motion } from 'framer-motion'
import { fast } from 'lib/static/transitions'
import styled, { css } from 'styled-components'

export const RadioGroup = ({ children, ...rest }) => <Container {...rest}>{children}</Container>

const Container = styled(motion(Root))`
  display: flex;
  padding: 3px;
  gap: 3px;
  width: 100%;
  justify-content: stretch;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
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
  height: 48px;
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
    &:hover {
      opacity: 1;
    }
  }
`

export const buttonHighlight = css`
  width: 100%;
  height: 100%;
  background: #ffffff1d;
  border-radius: 4px;
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