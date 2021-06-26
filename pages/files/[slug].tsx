import { FC } from 'react'
import { Layout } from 'components/Layout'
import { Template } from 'components/Template'

type Props = {
  slug: string
}

const File: FC<Props> = props => {
  return (
    <Layout file={props.slug}>
      <Template />
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
    paths: ['/files/og-image'],
    fallback: false,
  }
}

export default File
