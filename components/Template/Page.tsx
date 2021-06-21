import { FC } from 'react'

export const Page: FC<{ nodes: any }> = ({ nodes }) => {
  //const editor = useEditor()
  return <pre>{JSON.stringify(nodes, null, 2)}</pre>
}
