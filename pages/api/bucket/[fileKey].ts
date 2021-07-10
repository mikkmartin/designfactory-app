import { NextApiRequest, NextApiResponse } from 'next'
import aws from 'aws-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })
  const s3 = new aws.S3()
  const Key = req.query.fileKey
  const url = s3.getSignedUrl('getObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key,
    Expires: 60,
  })
  res.redirect(url)
}
