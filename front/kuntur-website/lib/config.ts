export const baseUrl =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000')
