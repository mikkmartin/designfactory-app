import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

export default function handler(_: Req, res: Res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json([
    {
      name: 'Levila',
      slug: 'story-levila-0e15k',
      urlpattern: '*://www.levila.ee/(tekstid|raadio|video)/*',
      selectors: {
        title: 'article h1',
        image: "meta[property='og:image'] | attr('content')",
        body: 'article p',
        media: 'main nav:nth-child(1) | txt',
      },
    },
  ])
}
