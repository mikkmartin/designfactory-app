import { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { db } from 'lib/db'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { store } from 'data/stores_v2'
import { useRouter } from 'next/router'
import { getCookie } from 'cookies-next'
import { ANON_ID } from 'lib/static/cookieKeys'
import Layout from 'components/Layout'

const Test: NextPage = observer(() => {
  const router = useRouter()
  const slug = router.query.slug as string
  store.content.setTheme(slug)
  const { theme, previewThemeFile } = store.content.template

  useEffect(() => {
    if (!theme.data) theme.loadData()
  }, [theme.data])

  return (
    <Layout>
      {JSON.stringify({ theme: theme.data?.name, preview: previewThemeFile?.name }, null, 2)}
    </Layout>
  )
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

export default Test
