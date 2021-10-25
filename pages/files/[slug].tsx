import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { db, IFile } from 'data/db'
import { store } from 'data'

const File: FC<IFile> = ({ children, ...file }) => {
  if (!file.template) return null
  store.editorStore.setFile(file)
  return (
    <Layout>
      <Canvas />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<IFile> = async ({ params: { slug } }) => {
  const { data: props, error } = await db.getFile(slug as string)
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

export default File
