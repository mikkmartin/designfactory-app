import { FC } from 'react'
import { Layout } from 'components/Layout'
import { Frame } from 'components/Template'

type Props = {
  slug: string
}

const File: FC<Props> = props => {
  return (
    <Layout file={props.slug}>
      <Frame />
    </Layout>
  )
}

export const getStaticProps = ({ params }) => {
  return {
    props: {
      slug: params.slug,
    },
  }
}

export const getStaticPaths = async () => {
  return {
    paths: ['/files/meta'],
    fallback: false,
  }
}

export default File
