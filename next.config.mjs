/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGO_URI:
      "mongodb+srv://rugvedkute02:pJFMwo0laLngw6BT@cluster0.87cnbtj.mongodb.net/",
    RESEND_API_KEY: "re_iN9WFQv3_9CFW71Xt1zaZS8DPgJL991DB",
    NEXTAUTH_SECRET: "ILOVEPDF",
    GOOGLE_GENERATIVE_AI_API_KEY: "AIzaSyAcEc3ev5yEMYLZMPvxZyPzcBbabWF3Z-E",
    NEXTAUTH_URL: "http://localhost:3000",
  },
};

export default nextConfig;
