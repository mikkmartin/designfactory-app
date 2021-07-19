import useSWR from 'swr'
import { FileResponse } from '@mikkmartin/figma-js'
import { useState, Dispatch, SetStateAction } from 'react'

type UseEditorTypes = (templateID: string, initialData: FileResponse) => UseEditorReturnTypes
type Object = { [key: string]: any }

type UseEditorReturnTypes = {
  template: FileResponse
  data: Object
  fonts: any[]
  setData: Dispatch<SetStateAction<{ [key: string]: any }>>
  onDataUpdate: (partialObject) => void
  loading: boolean
}

export const useEditor: UseEditorTypes = (templateID, initialTemplate): UseEditorReturnTypes => {
  const [data, setData] = useState({ image: '', tags: ['tere', 'head aega'] })
  const fetcher = url => fetch(`${url}?template=${templateID}`).then(r => r.json())
  const { data: template, isValidating } = useSWR('/api/figma', fetcher, {
    initialData: initialTemplate,
    focusThrottleInterval: 0,
  })

  return {
    template,
    data,
    fonts: [],
    setData,
    onDataUpdate: obj => setData(prev => ({ ...prev, ...obj })),
    loading: isValidating,
  }
}
