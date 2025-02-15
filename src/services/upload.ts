import s3Client from '../lib/s3';
import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const BUCKET_NAME = import.meta.env.VITE_AWS_BUCKET_NAME;

export async function uploadToS3(file: File): Promise<string> {
  const fileKey = `uploads/${Date.now()}-${file.name}`;
  
  // Get signed URL for upload
  const putCommand = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
    ContentType: file.type,
  });
  
  const signedUrl = await getSignedUrl(s3Client, putCommand, { expiresIn: 3600 });
  
  // Upload file using signed URL
  await fetch(signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  // Get public URL for the uploaded file
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileKey,
  });
  
  const publicUrl = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 * 24 * 7 }); // 7 days
  
  return publicUrl;
}