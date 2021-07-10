import aws from 'aws-sdk'

export default async function handler(req, res) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })

  const s3 = new aws.S3()
  const post: aws.S3.PresignedPost = await s3.createPresignedPost({
    Bucket: process.env.AWS_BUCKET_NAME,
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
