import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import type { GetTempaltesWithThemesResponse } from 'data/api/content'
import { supabase } from 'data/db/config'

export default async (req: Req, res: Res) => {
  const { method } = req
  switch (method) {
    case 'GET':
      return handleGet(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

export const handleGet = async (_, res: Res<GetTempaltesWithThemesResponse>) => {
  try {
    const { data, error } = (await supabase
      .from('templates')
      .select('*, themes!id (*)')
      .is('deleted_at', null)
      .is('themes.deleted_at', null)) as GetTempaltesWithThemesResponse
    res.status(200).json({ data, error })
  } catch ({ message }) {
    res.status(500).json({ data: null, error: message })
  }
}
