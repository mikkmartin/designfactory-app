import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req)
  res.end('shoud send email')
}

export const sendThankYou = (email: string) => {
  console.log('Send thank you to: ' + email)
}
