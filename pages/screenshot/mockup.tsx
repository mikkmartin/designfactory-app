import Mockup from 'components/Mockup'
import { getLatestImageKey } from 'data/latestImage'
import { GetServerSideProps } from 'next'

const Screenshot = ({ image, query }) => {
  return <Mockup editable={false} query={query} image={image} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const key = await getLatestImageKey()
  console.log('getServerSideProps()')
  console.log(query)
  return {
    props: {
      query,
      image: `/images/${key}`,
    },
  }
}

export default Screenshot
