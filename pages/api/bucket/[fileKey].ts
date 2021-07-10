import { NextApiRequest, NextApiResponse } from 'next'
import { authenticateAWS, Bucket } from 'lib/awsConfig'
import aws from 'aws-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  authenticateAWS()
  const s3 = new aws.S3()
  const Key = req.query.fileKey
  const url = s3.getSignedUrl('getObject', {
    Bucket,
    Key,
    Expires: 60,
  })
  res.redirect(url)
}
