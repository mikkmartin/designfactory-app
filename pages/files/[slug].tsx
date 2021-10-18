import { Layout } from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { FC } from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import { supabase, IFile } from 'data/supabase'
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
  const { data: props, error } = await supabase
    .from<IFile>('files')
    .select('slug')
    .eq('slug', slug as string)
    .select('*')
    .single()
  if (error) return { notFound: true }
  return {
    props,
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await supabase
    .from<IFile>('files')
    .select('slug')
    .eq('owner', 'public-templates')
  return {
    paths: data.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  }
}

export default File
