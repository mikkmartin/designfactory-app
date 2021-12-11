import { List, Trigger } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { Edit, Code, Layer } from 'components/Icons'
import { store } from 'data'
import { buttonHighlight } from 'components/Common/RadioGroup'
import { fast } from 'lib/static/transitions'
import { motion } from 'framer-motion'

export const Navigation = observer(() => {
  const currentTab = store.editor.currentTab
  const getIcon = (icon: typeof store.editor.tabs[number]) => {
    switch (icon) {
      case 'inputs':
        return Edit
      case 'code':
        return Code
      case 'bulk':
        return Layer
    }
  }
  const tabs = [...store.editor.tabs].map(tab => ({
    tab,
    Icon: getIcon(tab),
  }))
  return (
    <Container aria-label="Navigation">
      {tabs.map(({ tab, Icon }) => (
        <RadioButton value={tab}>
          <Icon />
          {currentTab === tab && <HighLight transition={fast} layoutId="tab-highlight" />}
        </RadioButton>
      ))}
    </Container>
  )
})

const Container = styled(List)`
  display: flex;
  padding: 3px 3px 5px 3px;
  gap: 3px;
  width: 100%;
  justify-content: stretch;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
`

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
`

const HighLight = styled(motion.div)`
  ${buttonHighlight}
  position: absolute;
  inset: 0;
  + div {
    opacity: 1;
  }
`
