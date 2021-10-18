import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Canvas } from 'components/Canvas'
import { urlToJson } from 'lib/urlEncoder'
import { supabase, IFile } from 'data/supabase'
import { store } from 'data'

export const Screenshot: FC<Props> = ({ file }) => {
  store.editorStore.setFile(file)
  return <Canvas editable={false} />
}

type Props = { file: IFile }
export const getServerSideProps: GetServerSideProps<Props> = async ({ query, resolvedUrl }) => {
  const { slug } = query
  const { data: file } = await supabase
    .from<IFile>('files')
    .select('template,id')
    .eq('slug', slug as string)
    .single()

  return {
    props: {
      file: { ...file, data: urlToJson(resolvedUrl) },
    },
  }
}

export default Screenshot
