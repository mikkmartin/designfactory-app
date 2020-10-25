import { NextApiRequest, NextApiResponse } from 'next'
import { getTemplate } from '../../data/figma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const template = await getTemplate('QFHu9LnnywkAKOdpuTZcgE')
  res.json(template)
}
