import { NextApiRequest as Req, NextApiResponse as Res } from 'next'

export default function handler(_: Req, res: Res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.json([])
}
