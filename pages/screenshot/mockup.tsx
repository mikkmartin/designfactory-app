import Mockup from 'components/Mockup'
import { getLatestImageKey } from 'data/latestImage'
import { GetServerSideProps } from 'next'

const Screenshot = ({image}) => {
  return <Mockup editable={false} image={image} blur />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const key = await getLatestImageKey()
  return {
    props: {
      query,
      image: `/images/${key}`
    },
  }
}

export default Screenshot
