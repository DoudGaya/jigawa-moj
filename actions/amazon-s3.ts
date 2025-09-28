
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

// Debug logging (remove in production)
console.log('AWS S3 Config:', {
  region: process.env.AWS_REGION,
  hasAccessKey: !!process.env.AWS_ACCESS_KEY_ID,
  hasSecretKey: !!process.env.AWS_SECRET_ACCESS_KEY,
  bucket: process.env.AWS_S3_BUCKET_NAME
});

export const uploadFileToS3 = async (file: File, bucketName: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;

  // Convert File to Uint8Array for proper upload
  const arrayBuffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(arrayBuffer);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: uint8Array,
      ContentType: file.type,
    },
  });

  try {
    const result = await upload.done();
    return result.Location || '';
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
};

export const uploadMultipleFilesToS3 = async (files: FileList, bucketName: string): Promise<string[]> => {
  const uploadPromises = Array.from(files).map(file => uploadFileToS3(file, bucketName));
  return Promise.all(uploadPromises);
};


export const deleteFileFromS3 = async (fileKey: string, bucketName: string): Promise<void> => {
  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucketName,
        Key: fileKey,
      })
    );
  } catch (error) {
    console.error('Error deleting file from S3:', error);
    throw error;
  }
};