import { NextApiResponse } from 'next'
import { getTemplate } from '../../data/figma'

export default async (_, res: NextApiResponse) => {
  const template = await getTemplate('QFHu9LnnywkAKOdpuTZcgE')
  res.json(template)
}
