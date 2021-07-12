import { URLSearchParams } from 'url'
import Mockup from 'components/Mockup'
import { getLatestImageKey } from 'data/latestImage'
import { GetServerSideProps } from 'next'

const Screenshot = ({ image, query }) => {
  return <Mockup editable={false} query={query} image={image} />
}

export const getServerSideProps: GetServerSideProps = async ({ resolvedUrl }) => {
  const key = await getLatestImageKey()
  const searchParams = new URLSearchParams(resolvedUrl.split('?').pop())
  const query = Object.fromEntries(searchParams.entries())

  return {
    props: {
      query,
      image: `/images/${key}`,
    },
  }
}

export default Screenshot
