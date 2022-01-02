import useSWR from 'swr'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { RadioGroup, Button } from 'components/Common/RadioGroup'
import { Lock, Refresh as RefreshIcon } from 'components/Icons'
import { useEffect, useState } from 'react'
import { store } from 'data'
import { motion } from 'framer-motion'
import { bouncy } from 'lib/static/transitions'

export const RefreshTemplate = observer(() => {
  const { loading } = store.file
  const [value, setValue] = useState('locked')
  //useRefreshTemplate(refresh)
  return (
    <Toggle defaultValue={value} onValueChange={setValue}>
      <Button value="locked">
        <Lock />
      </Button>
      <Button value="refresh">
        <Refresh
          style={{ rotate: 0 }}
          transition={loading ? { ...bouncy, mass: 2, repeat: Infinity } : { duration: 0 }}
          animate={loading ? { rotate: 180 } : {}}
        />
      </Button>
    </Toggle>
  )
})

const Refresh = styled(motion(RefreshIcon))``

const Toggle = styled(RadioGroup)`
  height: 48px;
  background: #282c34f0;
  backdrop-filter: blur(20px);
  border-radius: 6px;
  svg {
    stroke-width: 1.5px;
  }
`

const fetcher = templateId => fetch('/api/figma?template=' + templateId).then(res => res.json())
const useRefreshTemplate = () => {
  const { id: templateId, setTemplate, setLoading } = store.file
  const { isValidating } = useSWR(templateId, fetcher, {
    revalidateOnMount: false,
    focusThrottleInterval: 1000,
    onSuccess: data => setTemplate(data),
  })

  useEffect(() => {
    setLoading(isValidating)
  }, [isValidating])
}
