import { useRef } from 'react'
import { useClickAway } from 'react-use'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'
import { snappy } from 'lib/static/transitions'
import { InfoPanel } from './InfoPanel'
import { TemplatePanel } from './Template/TemplatePanel'
import { AddTemplate } from './Template/AddTemplate'
import { usePrevious } from 'react-use'
import { Tab } from './Tab'
import { useDrawer } from './DrawerContext'
import { Donation } from './Donation/Donation'
import { Unsubscribe } from './Donation/Unsubscribe'
import { Payment } from './Donation/Payment'
import { Confirmation } from './Donation/Confirmation'
import { DonationProvider } from './Donation/DonationContext'

export const Drawer = () => {
  const { setPanel, panel, panels, addTemplate } = useDrawer()
  const previousPanel = usePrevious(panel) as string
  const ref = useRef()

  useClickAway(
    ref,
    (ev: any) => {
      try {
        const el = ev.target
        const exptions =
          !!['Button', 'MuiPopover-root', 'MuiMenu-list'].find(str => el.className.includes(str)) ||
          el.getAttribute('aria-hidden') === 'true'
        if (!exptions) setPanel(false)
      } catch (e) {
        console.error(e)
      }
    },
    ['click']
  )

  const currentPanel = initial => {
    const props = { panels, panel, initial, previousPanel }
    switch (panel) {
      case 'info':
        return (
          <Tab {...props} key={panel}>
            <InfoPanel close={() => setPanel(false)} />
          </Tab>
        )
      case 'templates':
        return (
          <Tab {...props} key={panel}>
            <TemplatePanel close={() => setPanel(false)} onModify={() => setPanel('addtemplate')} />
          </Tab>
        )
      case 'addtemplate':
        return (
          <Tab {...props} key={panel}>
            <AddTemplate onCancel={() => setPanel('templates')} onAdd={addTemplate} />
          </Tab>
        )
      case 'donation':
        return (
          <Tab {...props} key={panel}>
            <Donation
              close={() => setPanel(false)}
              onDonate={() => setPanel('payment')}
              onCancelSubscription={() => setPanel('subscription-cancel')}
            />
          </Tab>
        )
      case 'subscription-cancel':
        return (
          <Tab {...props} key={panel}>
            <Unsubscribe
              onCancel={() => setPanel('donation')}
              onConfirmed={() => setPanel('unsubscribed')}
            />
          </Tab>
        )
      case 'payment':
        return (
          <Tab {...props} key={panel}>
            <Payment
              onBack={() => setPanel('donation')}
              onDonationComplete={() => setPanel('thank you')}
            />
          </Tab>
        )
      case 'thank you':
        return (
          <Tab {...props} key={panel}>
            <Confirmation onDone={() => setPanel(false)} />
          </Tab>
        )
      case 'unsubscribed':
        return (
          <Tab {...props} key={panel}>
            <Confirmation onDone={() => setPanel(false)} message="Unsubscribed" />
          </Tab>
        )
    }
  }

  return (
    <AnimatePresence>
      {panel && (
        <Container
          ref={ref}
          initial="closed"
          animate="open"
          exit="closed"
          variants={containerVariants}
          transition={snappy}>
          <div>
            <DonationProvider>
              <AnimatePresence custom={panel}>{currentPanel(!previousPanel)}</AnimatePresence>
            </DonationProvider>
          </div>
        </Container>
      )}
    </AnimatePresence>
  )
}

const containerVariants = {
  closed: { height: 0, transition: snappy },
  open: {
    height: 'auto',
    transition: snappy,
  },
}
const Container = styled(motion.div)`
  position: absolute;
  background: #3e4249;
  top: 56px;
  left: 0;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  > div {
    position: relative;
    width: 100%;
    height: 256px;
    background: rgba(255, 255, 255, 0.05);
  }
`
