// Note: S3 Image Component
export function getS3Url(image: string) {
  const baseUrl = process.env.NEXT_PUBLIC_S3_BASE_URL;
  return `${baseUrl}/${image}`;
}
