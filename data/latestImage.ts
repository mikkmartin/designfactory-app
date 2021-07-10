import aws from 'aws-sdk'

export const getLatestImageKey = async () => {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION,
    signatureVersion: 'v4',
  })

  const s3 = new aws.S3()
  const objects: aws.S3.ListObjectsV2Output = await s3
    .listObjectsV2({
      Bucket: process.env.AWS_BUCKET_NAME,
    })
    .promise()

  const sorted = objects.Contents.sort((a, b) =>
    a.LastModified < b.LastModified ? 1 : a.LastModified > b.LastModified ? -1 : 0
  )

  return sorted[0].Key
}
