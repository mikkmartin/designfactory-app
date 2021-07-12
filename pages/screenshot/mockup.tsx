import Mockup from 'components/Mockup'
import { getLatestImageKey } from 'data/latestImage'
import { GetServerSideProps } from 'next'

const Screenshot = ({image}) => {
  console.log('/screenshot/mockup.ts')
  return <Mockup editable={false} image={image} />
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
