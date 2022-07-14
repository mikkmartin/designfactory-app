import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { Button } from '../ui/Button'
import { Copy } from '../icons'
import { snappy, fast } from 'lib/static/transitions'
import { motion, AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'
import { store } from 'data'

export const ApiLink = observer(() => {
  const { downloadUrl } = store.ui
  const [method, setMethod] = useState<'GET' | 'POST'>('GET')
  const [copied, setCopied] = useState(false)
  const [toastShown, setToastShown] = useState(false)

  const handleIconClick = ev => {
    if (ev.metaKey) {
      setTimeout(() => window.open(downloadUrl, '_blank'))
      return
    }
    setCopied(true)
    navigator.clipboard.writeText(downloadUrl)
  }

  useEffect(() => {
    const id = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(id)
  }, [copied])

  useEffect(() => {
    if (method === 'POST') {
      setToastShown(true)
      const id = setTimeout(() => setToastShown(false), 2500)
      return () => clearTimeout(id)
    } else {
      setToastShown(false)
    }
  }, [method])

  return (
    <Container>
      <AnimatePresence>
        {toastShown && (
          <Toast
            initial="hidden"
            animate="shown"
            exit="hidden"
            transition={snappy}
            variants={{
              hidden: { scale: 1, opacity: 0, y: '-100%' },
              shown: { scale: 1, opacity: 1 },
            }}>
            <motion.span
              transition={snappy}
              variants={{
                hidden: { y: '100%' },
                shown: { y: '0%' },
              }}>
              Include the above as the request body
            </motion.span>
          </Toast>
        )}
      </AnimatePresence>
      <Button
        className={`method ${method}`}
        onTap={() => setMethod(method === 'GET' ? 'POST' : 'GET')}>
        {method}
      </Button>
      <Input
        type="text"
        onFocus={ev => ev.target.select()}
        onClick={ev => ev.stopPropagation()}
        readOnly
        value={downloadUrl}
      />
      <Button className="clipboard" onTap={handleIconClick} animate="initial" whileHover="hover">
        <motion.div transition={fast} variants={{ hover: { scale: 0.85, originY: -1.35 } }}>
          <Copy />
        </motion.div>
        <motion.small
          transition={fast}
          style={{ originY: 1.2 }}
          variants={{
            initial: { opacity: 0, scale: 0 },
            hover: { opacity: 1, scale: 1 },
          }}>
          {!copied ? 'copy' : 'copied'}
        </motion.small>
      </Button>
    </Container>
  )
})

const Toast = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 48px;
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #3d4148;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
`

const Container = styled.div`
  height: 54px;
  position: relative;
  display: flex;
  box-shadow: 0 -0.5px 0 0 rgba(255, 255, 255, 0.1);
  button.method {
    width: 80px;
    height: 100%;
    display: grid;
    place-content: center;
    font-family: sans-serif;
    font-size: 12px;
    &.GET {
      color: rgb(var(--highlight));
    }
    &.POST {
      color: #53d810;
    }
  }
  button.clipboard {
    position: absolute;
    top: 5px;
    right: 4px;
    width: 44px;
    height: 44px;
    z-index: 2;
    backdrop-filter: blur(20px);
    overflow: hidden;
    background: rgba(255,255,255,0.05);
    border-radius: 4px;
    svg {
      width: 18px;

    }
    :hover {
      background: rgba(255, 255, 255, 0.1);
      svg {
        opacity: 1;
      }
    }
    small {
      position: absolute;
      width: 100%;
      bottom: 7px;
      text-align: center;
      left: 0;
      font-size: 10px;
    }
  }
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: inherit;
  padding: 16px 4px 16px 8px;
  background: transparent;
  border: 0;
  color: white;
  outline: none;
  font-size: 12px;
  &::selection {
    background: white;
    color: #1e1e1e;
  }
`
