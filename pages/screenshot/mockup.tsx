import Mockup from 'components/Mockup'
import { getLatestImageKey } from 'data/latestImage'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const Screenshot = ({ image }) => {
  const { query } = useRouter()
  console.log('/files/mockup.ts')
  console.log(query)

  return <Mockup editable={false} image={image} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const key = await getLatestImageKey()
  return {
    props: {
      query,
      image: `/images/${key}`,
    },
  }
}

export default Screenshot
