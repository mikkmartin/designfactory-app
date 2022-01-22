import { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import apiWrapper from 'lib/api/apiWrapper'
import { getImageReferances } from 'lib/figma'
import { NextApiResponse } from 'next'

export default (req: Req, res: Res) => apiWrapper(req, res, handler)

const handler = async (req, res: NextApiResponse) => {
  const id = req.query.id
  const response = await getImageReferances(id).then(res => res.data)
  if (response.error) throw response.error
  res.status(200).json({ data: response.meta, error: null })
}
