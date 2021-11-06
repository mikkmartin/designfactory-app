interface MetaTags {
  title: string
  description: string
  image: string
  url: string
  siteName: string
  twitterCard: string
  twitterCreator: string
  twitterSite: string
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterUrl: string
  ogType: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogUrl: string
  ogSiteName: string
  ogLocale: string
  ogLocaleAlternate: string
  [key: string]: string
}

export const parseMetaTags = (html: string): Partial<MetaTags> => {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const metaTags = dom.getElementsByTagName('meta')
  const metaTagsMap = {}
  for (let i = 0; i < metaTags.length; i++) {
    const metaTag = metaTags[i]
    const name = metaTag.getAttribute('name') || metaTag.getAttribute('property')
    const content = metaTag.getAttribute('content')
    if (name && content) {
      metaTagsMap[name] = content
    }
  }
  return metaTagsMap
}
