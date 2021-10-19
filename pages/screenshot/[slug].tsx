import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Canvas } from 'components/Canvas'
import { urlToJson } from 'lib/urlEncoder'
import { supabase, IFile } from 'data/supabase'
import { store } from 'data'
import Metrics from 'lib/performanceMetrics'

export const Screenshot: FC<Props> = ({ file }) => {
  store.editorStore.setFile(file)
  return <Canvas editable={false} />
}

type Props = { file: IFile }
export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
  resolvedUrl,
  res,
}) => {
  const { slug } = query
  const perf = new Metrics()
  perf.startTimer('DB query', 'db')

  const { data: file } = await supabase
    .from<IFile>('files')
    .select('template,id')
    .eq('slug', slug as string)
    .single()

  perf.endTimer('DB query')
  perf.setHeader(res)

  return {
    props: {
      file: { ...file, data: urlToJson(resolvedUrl) },
    },
  }
}

export default Screenshot
