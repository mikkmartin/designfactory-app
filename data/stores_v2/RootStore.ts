import { makeAutoObservable } from 'mobx'
import { ContentStore } from './content/ContentStore'
import type { TemplateData } from 'data/db'
import type { Router } from 'next/router'

type HydrationData = {
  router: Router
  pageProps: { data: TemplateData }
}

export class RootStore {
  content: ContentStore = null

  constructor() {
    this.content = new ContentStore(this)
    makeAutoObservable(this)
  }

  hydrate({ router, pageProps }: HydrationData) {
    if (router.route === '/temp/[slug]') {
      this.content.hydrateTemplate(pageProps.data, router.query.slug as string)
    }
  }
}

export const store = new RootStore()
