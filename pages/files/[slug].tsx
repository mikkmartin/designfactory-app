import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { FC, useRef } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, IFileWithTemplates } from 'lib/db'
import { store } from 'data'

const File: FC<IFileWithTemplates> = ({ children, ...file }) => {
  if (!file.id) return null
  setInitialData(file)

  return (
    <Layout>
      <Canvas />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<IFileWithTemplates> = async ({ params: { slug } }) => {
  const { data: props, error } = await db.getFileWithTemplates(slug as string)
  if (error) return { notFound: true }
  return {
    props,
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await db.getSlugs()
  return {
    paths: data.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}

const setInitialData = (file: IFileWithTemplates) => {
  const id = useRef(null)
  if (id.current !== file.id) {
    id.current = file.id
    store.setInitialData(file)
  }
}

export default File
