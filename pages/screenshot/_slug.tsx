import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Canvas } from 'components/Canvas'
import { urlToJson } from 'lib/urlEncoder'
import { db, IFile } from 'data/db'
import { store } from 'data'
import Metrics from 'lib/performanceMetrics'
import { markdownToHtml } from 'lib/markdownConverter'
import { findNodes } from 'components/Canvas/parseTemplate/parseTemplate'

export const Screenshot: FC<Props> = ({ file }) => {
  store.setInitialData(file)
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
  const { data: file } = await db.getFile(slug as string)
  perf.endTimer('DB query')

  const data = urlToJson(resolvedUrl)
  const textNodes = findNodes('TEXT', file.template.document.children).map(node => node.name)

  perf.startTimer('Converting to markdown', 'md')
  await Object.keys(data).forEach(async key => {
    if (textNodes.includes(key)) data[key] = await markdownToHtml(data[key])
  })
  perf.endTimer('Converting to markdown')
  perf.setHeader(res)

  return {
    props: {
      file: { ...file, data },
    },
  }
}

export default Screenshot
