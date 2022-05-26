import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

export default function handler(req: Req, res: Res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json([
    {
      name: 'Reddit card2',
      slug: 'story-reddit-oixeh',
      urlpattern: '*://www.reddit.com/*/*/comments/*/*',
      selectors: {
        title: "[data-test-id='post-content'] h1",
        logo: "header button > img | attr('src')",
        author: [
          "#overlayScrollContainer [data-testid='post_author_link']",
          "[data-testid='post_author_link']",
        ],
        subreddit: "[data-testid='community-pill'] div",
        upvotes: "[data-test-id='post-content'] > div span[role='screen-reader']",
        comments: "[data-test-id='post-content'] > div:last-child span[role='screen-reader']",
        body: ["[data-test-id='post-content'] p | parent | txt", null],
        image: [
          "#overlayScrollContainer [data-test-id='post-content'] [Alt='Post image'] | attr('src')",
          "#overlayScrollContainer [data-click-id='media'] video | parent | child | style('backgroundImage') | asUrl",
          "#overlayScrollContainer figure | parent | find('li[style='left: 0px;'] img') | attr('src')",
          "#overlayScrollContainer .ImageBox-image | attr('src')",
          "[data-test-id='post-content'] [Alt='Post image'] | attr('src')",
          "[data-click-id='media'] video | parent | child | style('backgroundImage') | asUrl",
          "[data-test-id='post-content'] figure | parent('ul') | find('li[style='left:0px'] img, li[style='left: 0px;'] img') | attr('src')",
          "[data-test-id='post-content'] .ImageBox-image | attr('src')",
          null,
        ],
        media: {
          video: [
            "#overlayScrollContainer [data-test-id='post-content'] [Alt='Post image'] | get",
            "#overlayScrollContainer [data-click-id='media'] video | get",
            "[data-test-id='post-content'] [Alt='Post image'] | get",
            "[data-click-id='media'] video | get",
          ],
          image: '',
        },
      },
    },
  ])
}
