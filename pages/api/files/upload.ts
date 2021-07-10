import aws from 'aws-sdk'
import { authenticateAWS, Bucket } from 'lib/awsConfig'

export default async function handler(req, res) {
  authenticateAWS()
  const s3 = new aws.S3()
  const post: aws.S3.PresignedPost = await s3.createPresignedPost({
    Bucket,
    Fields: {
      key: `temp.${(req.query.file.split('.')[1] as string).toLowerCase()}`,
    },
    Expires: 60, // seconds
    Conditions: [
      ['content-length-range', 0, 1024 * 1024 * 10], // up to 10 MB
    ],
  })

  res.status(200).json(post)
}
