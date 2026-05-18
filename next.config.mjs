/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/app.html", permanent: false }];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.openai.com" },
      { protocol: "https", hostname: "oaidalleapiprodscus.blob.core.windows.net" },
    ],
  },
};

export default nextConfig;
