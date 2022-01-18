import { List, Trigger } from '@radix-ui/react-tabs'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import { EditForm, Code, Droplet } from 'components/icons'
import { store } from 'data'
import type { Tab } from 'data/stores/UiStore'
import { buttonHighlight } from 'components/ui/RadioGroup'
import { fast } from 'lib/static/transitions'
import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export const Navigation = observer(() => {
  const iconAnimation = useAnimation()
  const { tab: currentTab, tabs: _tabs, templatePanelIsOpen } = store.ui
  const getIcon = (icon: Tab) => {
    switch (icon) {
      case 'inputs':
        return EditForm
      case 'code':
        return Code
      case 'designs':
        return Droplet
    }
  }

  const tabs = [..._tabs].map(tab => ({
    tab,
    Icon: getIcon(tab),
  }))

  useEffect(() => {
    if (!templatePanelIsOpen) {
      iconAnimation.set({ background: 'rgba(255, 255, 255, 0)' })
      iconAnimation.start({
        y: 0,
        background: ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)'],
        transition: {
          y: {
            delay: 0.6,
            type: 'spring',
            velocity: 1200,
            stiffness: 700,
            damping: 80,
          },
          background: {
            delay: 0.6,
            duration: 0.5,
            ease: 'easeOut',
          },
        },
      })
    }
  }, [templatePanelIsOpen])

  return (
    <Container aria-label="Navigation">
      {tabs.map(({ tab, Icon }) => {
        return (
          <RadioButton key={tab} initial={false} animate={tab === 'designs' ? iconAnimation : {}}>
            <Trigger value={tab}>
              <Icon />
              {currentTab === tab && <HighLight transition={fast} layoutId="tab-highlight" />}
            </Trigger>
          </RadioButton>
        )
      })}
    </Container>
  )
})

const Container = styled(List)`
  display: flex;
  padding: 3px 3px 5px 3px;
  gap: 3px;
  justify-content: stretch;
  background: var(--background-l2);
  border-radius: 3px;
`

const RadioButton = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  position: relative;
  border-radius: 0.25rem;
  > button {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background: transparent;
    cursor: pointer;
    border: none;
    svg {
      width: 20px;
      stroke-width: 1.5px;
      transition: transform 0.1s ease-out;
      opacity: 0.5;
      color: white;
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
      box-shadow: 0 0 0 1px rgb(var(--highlight));
      background-color: rgba(var(--highlight), 0.1);
      border-radius: 0.25rem;
      > * {
        opacity: 1;
      }
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
