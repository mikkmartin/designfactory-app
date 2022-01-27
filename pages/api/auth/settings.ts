import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { UpdateSettingsResponse } from 'data/api/content'
import { supabase } from 'lib/db/config'
import { definitions } from 'lib/db/types'
import { ANON_ID } from 'lib/static/cookieKeys'

export default async (req: Req, res: Res) => {
  const { method } = req
  switch (method) {
    case 'PATCH':
      return handleUpdate(req, res)
    default:
      res.setHeader('Allow', ['PATCH'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleUpdate = async (req: Req, res: Res<UpdateSettingsResponse>) => {
  await supabase
    .from<definitions['profiles']>('profiles')
    .update({ interface_settings: JSON.parse(req.body) })
    .eq('id', req.cookies[ANON_ID])
    .single()
  res.json({ data: JSON.parse(req.body), error: null })
}
