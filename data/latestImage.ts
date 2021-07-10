import aws from 'aws-sdk'
import { authenticateAWS, Bucket } from 'lib/awsConfig'

export const getLatestImageKey = async () => {
  authenticateAWS()

  const s3 = new aws.S3()
  const objects: aws.S3.ListObjectsV2Output = await s3.listObjectsV2({ Bucket }).promise()

  const sorted = objects.Contents.sort((a, b) =>
    a.LastModified < b.LastModified ? 1 : a.LastModified > b.LastModified ? -1 : 0
  )

  return sorted[0].Key
}
