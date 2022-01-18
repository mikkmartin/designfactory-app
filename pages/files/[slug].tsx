import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db } from 'lib/db'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { store } from 'data'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { ANON_ID } from 'lib/static/cookieKeys'
import Layout from 'components/Layout'
import { Canvas } from 'components/Canvas'
import { getSchemas } from 'components/Canvas/parseTemplate/getSchemas'

const File: NextPage = observer(() => {
  const router = useRouter()
  const slug = router.query.slug as string
  store.content.setTheme(slug)
  const { theme, previewThemeFile } = store.content.template
  const themeData = previewThemeFile || theme.data

  useMemo(() => {
    if (!themeData) return theme.loadData()
    const { schema, uiSchema } = getSchemas(themeData)
    theme.setEditorSchema(schema)
    theme.setUiSchema(uiSchema)
  }, [themeData])

  return <Layout>{themeData ? <Canvas themeData={themeData} /> : 'Loading...'}</Layout>
})

type Props = {
  data: db.TemplateWithThemes
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ params, req }) => {
  const anonID = getCookie(ANON_ID, { req }) as string | undefined
  const { data } = await db.getTemplate({ anonID })
  const hasSlug = data.some(({ themes }) => themes.some(({ slug }) => slug === params.slug))
  if (!data?.length || !hasSlug) return { notFound: true }
  return {
    props: { data },
  }
}

export default File
