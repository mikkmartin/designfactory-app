import { motion } from 'framer-motion'
import styled from 'styled-components'
import { store } from 'data'
import { observer } from 'mobx-react-lite'
import { RadioButtonGroup, RadioButton } from 'components/Common'
import { Refresh, Lock } from 'components/Icons'
import { useState } from 'react'

export const Loading = observer(() => {
  const loading = store.editor.loading
  const [poll, setPoll] = useState(false)

  const Spinner = () => {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: loading ? Infinity : 0, duration: 0.5, repeatDelay: 0.1 }}>
        <Refresh />
      </motion.div>
    )
  }

  return (
    <Container>
      <RadioButtonGroup>
        {[
          { value: 'lock', Icon: Lock },
          { value: 'poll', Icon: Spinner },
        ].map(({ value, Icon }, i) => (
          <RadioButton
            disabled
            key={i}
            value={value}
            onChange={v => setPoll(v === 'poll')}
            selected={Boolean(i) !== poll}>
            <Icon />
          </RadioButton>
        ))}
      </RadioButtonGroup>
    </Container>
  )
})

const Container = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  svg {
    width: 18px;
    display: block;
  }
`
