import { useEffect, useState } from 'react'
import { useEditor } from '../Editor'
import baseURL from '../../static/baseURL'

export const ApiLink = () => {
  const { json } = useEditor()
  const [url, setUrl] = useState('')
  useEffect(() => setUrl(getUrl()), [json])

  const getUrl = function () {
    const { fileName, items, ...obj } = json
    var str = []
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
    str.push(`items=${encodeURIComponent(JSON.stringify(items))}`)
    return `${baseURL}/invoice/${fileName}?${str.join('&')}`
  }

  return (
    <input
      type="text"
      onFocus={ev => ev.target.select()}
      onClick={ev => ev.stopPropagation()}
      readOnly
      value={url}
    />
  )
}
