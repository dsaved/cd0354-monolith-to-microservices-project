import AWS = require('aws-sdk');
import { config } from './config/config';


// Configure AWS
// const credentials = new AWS.SharedIniFileCredentials({ profile: config.aws_profile });
// AWS.config.credentials = credentials;
AWS.config.credentials = {
  accessKeyId: process.env.ALX_AWS_ACCESS_KEY,
  secretAccessKey: process.env.ALX_AWS_SECRET_KEY,
};

export const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: config.aws_region,
  params: { Bucket: config.aws_media_bucket },
});

// Generates an AWS signed URL for retrieving objects
export async function getGetSignedUrl(key: string): Promise<string> {
  const signedUrlExpireSeconds = 60 * 5;

  const link: string = await new Promise((resolve, reject) =>
    s3.getSignedUrl('getObject', {
      Bucket: config.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds,
    }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    }),
  );

  console.log(link);
  return link;
}

// Generates an AWS signed URL for uploading objects
export async function getPutSignedUrl(key: string): Promise<string> {
  const signedUrlExpireSeconds = 60 * 5;

  const link: string = await new Promise((resolve, reject) =>
    s3.getSignedUrl('putObject', {
      Bucket: config.aws_media_bucket,
      Key: key,
      Expires: signedUrlExpireSeconds,
    }, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    }),
  );

  console.log(link);
  return link;
}
