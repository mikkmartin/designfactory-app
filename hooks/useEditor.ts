import useSWR from 'swr'
import { FileResponse } from '@mikkmartin/figma-js'

type UseEditorTypes = (templateID: string, initialData: FileResponse) => UseEditorReturnTypes
type Object = { [key: string]: any }

type UseEditorReturnTypes = {
  template: FileResponse
  data: Object
  schema: Object
  fonts: any[]
  onDataUpdate: (json) => Object
  loading: boolean
}

export const useEditor: UseEditorTypes = (templateID, initialData): UseEditorReturnTypes => {
  const fetcher = url => fetch(`${url}?template=${templateID}`).then(r => r.json())
  const { data, isValidating } = useSWR('/api/figma', fetcher, {
    initialData,
    focusThrottleInterval: 0,
  })

  return {
    template: data,
    data: {},
    fonts: [],
    schema: {},
    onDataUpdate: () => ({}),
    loading: isValidating,
  }
}
