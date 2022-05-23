import { supabase } from 'lib/db/config'
import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { CreateAuthUserResponse } from 'data/api/auth'
import { definitions } from 'lib/db/types'

export default async (req: Req, res: Res) => {
  const { method } = req
  switch (method) {
    case 'POST':
      return handleCreateAnonUser(req, res)
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleCreateAnonUser = async (_, res: Res<CreateAuthUserResponse>) => {
  try {
    const { data, error } = await supabase
      .from<definitions['profiles']>('profiles')
      .insert({})
      .single()
    const epireDate = new Date(2147483647 * 1000).toUTCString()
    res.setHeader('Set-Cookie', `df:anon:id=${data.id}; path=/; secure; expires: ${epireDate}`)
    res.status(200).json({ data, error })
  } catch ({ message: error }) {
    res.status(500).json({ data: null, error })
  }
}
