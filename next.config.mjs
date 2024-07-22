/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      YOUR_API_KEY,
    RESEND_API_KEY: YOUR_API_KEY ,
    NEXTAUTH_SECRET: YOUR_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: YOUR_API_KEY,
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

export default nextConfig;
