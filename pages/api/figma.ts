import { NextApiResponse } from 'next'
import { getTemplate } from '../../data/figma'

export default async (_, res: NextApiResponse) => {
  const template = await getTemplate('qQJ7d5IKYTCVpaAMNptPH4')
  res.json(template)
}
