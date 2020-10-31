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
    const { fileName = defaults.fileName, items, fonts, ...obj } = json
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
    str.push(`items=${encodeURIComponent(JSON.stringify(items))}`)
    if (fonts) str.push(`fonts=${encodeURIComponent(JSON.stringify(fonts))}`)
    return `${baseURL}/invoice/${fileName}?${str.join('&')}`
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
    color: #0097ff;
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
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
  padding: 16px 0 16px 64px;
  background: #32363e;
  border: 0;
  color: white;
  outline: none;
  font-size: 12px;
  &::selection {
    background: white;
    color: #1e1e1e;
  }
`
