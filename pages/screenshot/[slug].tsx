import { GetServerSideProps } from 'next'
import { Canvas } from 'components/Canvas'
import storageURL from 'lib/static/storageURL'

export const Screenshot = ({ data }) => {
  return <Canvas themeData={data} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  const url = `${storageURL}/themes/files/${slug}.json`
  const data = await fetch(url).then(res => res.json())
  return { props: { data } }
}

export default Screenshot
