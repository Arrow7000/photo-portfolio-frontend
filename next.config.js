module.exports = {
  images: {
    domains: ["d3ltknfikz7r4w.cloudfront.net"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*", // Proxy to Backend
      },
      {
        source: "/auth/:path*",
        destination: "http://localhost:4000/auth/:path*", // Proxy to Backend
      },
    ];
  },
};
