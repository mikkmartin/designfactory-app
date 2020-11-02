import { useEffect, useState } from 'react'
import { useEditor } from '../Editor'
import baseURL from '../../static/baseURL'
import styled from 'styled-components'
import { defaults } from '../../static/invoice'

export const ApiLink = () => {
  const { json } = useEditor()
  const [url, setUrl] = useState('')
  useEffect(() => setUrl(getUrl()), [json])

  const getUrl = function () {
    const { fileName = defaults.fileName, ...obj } = json
    const query = Object.entries(obj)
      .map(([k, v]) => {
        if (Array.isArray(obj[k])) return `${k}[]=${JSON.stringify(v)}`
        else return `${k}=${v}`
      })
      .join('&')
    return `${baseURL}/invoice/${fileName}?${query}`
  }

  return (
    <Container>
      <Input
        type="text"
        onFocus={ev => ev.target.select()}
        onClick={ev => ev.stopPropagation()}
        readOnly
        value={url}
      />
    </Container>
  )
}

const Container = styled.div`
  height: 54px;
  position: relative;
  &::before,
  &::after {
    position: absolute;
    pointer-events: none;
  }
  &::before {
    content: 'GET';
    width: 64px;
    height: 100%;
    display: grid;
    place-content: center;
    color: var(--highlight);
    font-family: sans-serif;
    font-size: 12px;
  }
  &::after {
    content: ' ';
    white-space: pre;
    background: linear-gradient(90deg, rgba(50, 54, 62, 0) 0%, rgba(50, 54, 62, 1) 86%);
    right: 0;
    width: 8px;
    height: 100%;
  }
`

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: inherit;
  padding: 16px 0 16px 64px;
  background: rgba(255, 255, 255, 0.1);
  border: 0;
  color: white;
  outline: none;
  font-size: 12px;
  &::selection {
    background: white;
    color: #1e1e1e;
  }
`
