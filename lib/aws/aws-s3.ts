import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import { env } from "process";

// Configure S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
  }
});

export const uploadFileToS3 = async (file: File, bucketName: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: fileName,
      Body: file,
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


// import { S3 } from 'aws-sdk'

// // Initialize S3 client
// const s3 = new S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// })

// export async function uploadFileToS3(file: File, folder: string) {
//   const params = {
//     Bucket: process.env.AWS_BUCKET_NAME!,
//     Key: `${folder}/${Date.now()}-${file.name}`,
//     Body: file,
//     ACL: 'public-read', // or private based on your needs
//   }

//   const data = await s3.upload(params).promise()
//   return data.Location // This will be the URL of the uploaded file
// }
