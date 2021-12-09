import { Root, Content, List, Trigger } from '@radix-ui/react-tabs'
import { Editor } from 'components/Editor'
import { Edit, Code, Layer } from 'components/Icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import {} from 'components/Common'
import { observer } from 'mobx-react-lite'
import { ApiLink } from './ApiLink'
import styled, { css } from 'styled-components'
import { RadioGroup, Button, buttonHighlight } from 'components/Common/RadioGroup'
import { fast } from 'lib/static/transitions'

export const Tabs = observer(() => {
  const items = [
    {
      value: 'Inputs',
      Icon: () => <Edit />,
      Component: () => (
        <div>
          <RadioGroup>
            <Button value="a">Hello</Button>
            <Button value="b">There</Button>
            <Button value="c">hi</Button>
          </RadioGroup>
        </div>
      ),
    },
    {
      value: 'Code',
      Icon: () => <Code />,
      Component: () => (
        <>
          <Editor />
          <ApiLink />
        </>
      ),
    },
    {
      value: 'Bulk',
      Icon: () => <Layer />,
      Component: () => <div>Bulk</div>,
    },
  ]
  const [currentValue, setValue] = useState(items[0].value)
  return (
    <Container
      value={currentValue}
      onValueChange={setValue}
      activationMode="manual"
      orientation="horizontal">
      {items.map(({ value, Component }) => (
        <Content value={value} asChild>
          <Component />
        </Content>
      ))}
      <ListItems aria-label="Navigation">
        {items.map(({ value, Icon }) => (
          <RadioButton key={value} value={value}>
            <Icon />
            {currentValue === value && <HighLight transition={fast} layoutId="thighlight" />}
          </RadioButton>
        ))}
      </ListItems>
    </Container>
  )
})

const HighLight = styled(motion.div)`
  ${buttonHighlight}
  position: absolute;
  inset: 0;
  + div {
    opacity: 1;
  }
`

const radioButtonStyle = css``

const RadioButton = styled(Trigger)`
  background: transparent;
  cursor: pointer;
  width: 100%;
  position: relative;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 20px;
    stroke-width: 1.5px;
    transition: transform 0.1s ease-out;
    opacity: 0.5;
  }
  &:hover svg,
  &[data-state='active'] svg {
    opacity: 1;
  }
  &:active > svg {
    transform: scale(0.8);
    transition: transform 0s;
  }
  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 0.5px rgb(var(--highlight));
    background-color: rgba(var(--highlight), 0.1);
    border-radius: 0.25rem;
    > * {
      opacity: 1;
    }
  }
  ${radioButtonStyle}
`

const Container = styled(Root)`
  display: grid;
  height: 100%;
  grid-template-rows: 1fr auto;
`

const ListItems = styled(List)`
  display: flex;
  padding: 3px 3px 5px 3px;
  gap: 3px;
  width: 100%;
  justify-content: stretch;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
`
