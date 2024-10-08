import { S3 } from 'aws-sdk'

// Initialize S3 client
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
})

export async function uploadFileToS3(file: File, folder: string) {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${folder}/${Date.now()}-${file.name}`,
    Body: file,
    ACL: 'public-read', // or private based on your needs
  }

  const data = await s3.upload(params).promise()
  return data.Location // This will be the URL of the uploaded file
}
