import aws from 'aws-sdk'

export const authenticateAWS = () =>
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })

export const Bucket = process.env.AWS_BUCKET_NAME