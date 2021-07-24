import useSWR from 'swr'
import { FileResponse } from '@mikkmartin/figma-js'

type UseEditorTypes = (templateID: string, initialData: FileResponse) => UseEditorReturnTypes
type Object = { [key: string]: any }

type UseEditorReturnTypes = {
  template: FileResponse
  data: Object
  fonts: any[]
  loading: boolean
}

export const useEditor: UseEditorTypes = (templateID, initialTemplate): UseEditorReturnTypes => {
  const fetcher = url => fetch(`${url}?template=${templateID}`).then(r => r.json())
  const { data: template, isValidating } = useSWR('/api/figma', fetcher, {
    initialData: initialTemplate,
    focusThrottleInterval: 0,
  })

  const data = {
    fromName: 'Tere',
    items: [
      {
        title: 'Item name',
        description: 'Item description',
        price: 200,
        quantity: 1,
      },
      {
        title: 'Item two',
        description: 'Second item description',
        price: 20,
        quantity: 1,
      },
    ],
  }

  return {
    template,
    data,
    fonts: [],
    loading: isValidating,
  }
}
