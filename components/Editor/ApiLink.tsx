import { useEffect, useState } from 'react'
import { useEditor } from '../Editor'
import baseURL from '../../static/baseURL'
import styled from 'styled-components'
import { defaults } from '../../static/invoice'
import { Button } from './Button'
import { Copy } from '../Icons'
import { motion } from 'framer-motion'

export const ApiLink = () => {
  const { json } = useEditor()
  const [url, setUrl] = useState('')
  const [method, setMethod] = useState('GET')
  const [copied, setCopied] = useState(false)
  useEffect(() => setUrl(getUrl()), [json, method])

  const getUrl = function () {
    const { fileName = defaults.fileName, ...obj } = json
    if (method === 'POST') return `${baseURL}/invoice/${fileName}`
    const query = Object.entries(obj)
      .map(([k, v]) => {
        if (Array.isArray(obj[k])) return encodeURI(`${k}[]=${JSON.stringify(v)}`)
        else return encodeURI(`${k}=${v}`)
      })
      .join('&')
    return `${baseURL}/invoice/${fileName}?${query}`
  }

  const copy = () => {
    const url = getUrl()
    setCopied(true)
    navigator.clipboard.writeText(url)
  }

  useEffect(() => {
    const id = setTimeout(() => setCopied(false), 1500)
    return () => clearTimeout(id)
  }, [copied])

  return (
    <Container>
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
        value={url}
      />
      <Button className="clipboard" onTap={copy} animate="initial" whileHover="hover">
        <motion.div variants={{ hover: { scale: 0.85, originY: -1 } }}>
          <Copy />
        </motion.div>
        <motion.small
          transition={{ duration: 0.15, opacity: { duration: 0.1 } }}
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
}

const Container = styled.div`
  height: 54px;
  position: relative;
  display: flex;
  background: rgba(255, 255, 255, 0.05);
  button {
    :hover {
      background: rgba(255, 255, 255, 0.05);
    }
    :not(:hover) {
      background: transparent;
    }
  }
  button.method {
    width: 80px;
    height: 100%;
    display: grid;
    place-content: center;
    font-family: sans-serif;
    font-size: 12px;
    &.GET {
      color: var(--highlight);
    }
    &.POST {
      color: #53D810;
    }
  }
  button.clipboard {
    font-family: inherit;
    position: absolute;
    right: 0;
    z-index: 2;
    backdrop-filter: blur(8px);
    overflow: hidden;
    small {
      position: absolute;
      width: 100%;
      bottom: 11px;
      text-align: center;
      left: 0;
    }
  }
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: inherit;
  padding: 16px 0 16px 8px;
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
