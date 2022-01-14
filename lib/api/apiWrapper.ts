import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { ANON_ID } from '../static/cookieKeys'

export default async function apiWrapper(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: NextApiHandler
) {
  try {
    const anonID = req.cookies[ANON_ID]
    console.log(`[${req.method}] ${req.url}`)
    console.log({ anonID, query: req.query, body: req.body })
    if (!anonID) return res.status(401).json({ data: null, error: { message: `Unauthorized` } })
    return handler(req, res)
  } catch (error) {
    return res.status(500).json({ error })
  }
}
