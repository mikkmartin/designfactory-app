import { FC } from 'react'
import { GetServerSideProps } from 'next'
import { Canvas } from 'components/Canvas'

export const Screenshot = ({ slug, data }) => {
  return <Canvas template={data} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug } = query
  return {
    props: {
      slug,
      data: await fetch(
        `https://sdqycteblanimltlbiss.supabase.in/storage/v1/object/public/themes/files/${slug}.json`
      ).then(res => res.json()),
    },
  }
}

export default Screenshot
