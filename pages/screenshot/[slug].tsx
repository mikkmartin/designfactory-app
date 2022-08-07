import { GetServerSideProps } from 'next'
import { Canvas } from 'components/Canvas'
import storageURL from 'lib/static/storageURL'
import { FileResponse } from '@mikkmartin/figma-js'
import { FC } from 'react'
import baseURL from 'lib/static/baseURL'

type Props = {
  slug: string
  themeData: FileResponse
  inputData: Object
}

export const Screenshot: FC<Props> = ({ slug, themeData, inputData }) => {
  return (
    <Canvas
      getImageUrl={refId => `${storageURL}/themes/files/${slug}/${refId}.png`}
      getFontUrl={fontFamily => `${storageURL}/themes/files/${slug}/${fontFamily}.ttf`}
      editable={false}
      themeData={themeData}
      inputData={inputData}
    />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => {
  const { slug, ...inputData } = query
  const url = `${baseURL}/api/figma/cached/${slug}`

  const themeData = await fetch(url).then(res => res.json())
  return { props: { slug: slug as string, themeData, inputData } }
}

export default Screenshot
