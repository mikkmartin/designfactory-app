import Mockup from 'components/Mockup'
import { GetServerSideProps } from 'next'

const Screenshot = () => {
  return <Mockup editable={false} image="/mockups/temp.png" blur />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: query,
  }
}

export default Screenshot
