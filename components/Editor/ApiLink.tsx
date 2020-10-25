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
    const { fileName = defaults.fileName, items, ...obj } = json
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
    str.push(`items=${encodeURIComponent(JSON.stringify(items))}`)
    return `${baseURL}/invoice/${fileName}?${str.join('&')}`
  }

  return (
    <Input
      type="text"
      onFocus={ev => ev.target.select()}
      onClick={ev => ev.stopPropagation()}
      readOnly
      value={url}
    />
  )
}

const Input = styled.input`
  height: 54px;
  padding: 16px 0 16px 16px;
  background: #454545;
  border: 0;
  color: rgba(0, 0, 0, 0.9);
  outline: none;
  &::selection {
    background: white;
    color: #1e1e1e;
  }
`
