export const config = {
  'aws_region': process.env.ALX_AWS_REGION,
  'aws_profile': process.env.ALX_AWS_PROFILE,
  'aws_media_bucket': process.env.ALX_AWS_BUCKET,
  'url': process.env.ALX_URL,
  'jwt': {
    'secret': process.env.ALX_JWT_SECRET,
  },
};
