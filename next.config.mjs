/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.openai.com" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
    ],
  },
};

export default nextConfig;
