import aws from 'aws-sdk'

export const authenticateAWS = () =>
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS,
    secretAccessKey: process.env.AWS_SECRET,
    region: process.env.AWS_REG,
    signatureVersion: 'v4',
  })

export const Bucket = process.env.AWS_BUCKET