import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (file) => {
  const fileKey = `uploads/${Date.now()}-${file.originalname}`;
  
  const putCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  });
  
  await s3Client.send(putCommand);
  
  const getCommand = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileKey,
  });
  
  const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 * 24 * 7 });
  return url;
};