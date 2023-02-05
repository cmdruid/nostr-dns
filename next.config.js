/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
        {
          source: '/.well_known/:path(nostr.json*)',
          destination: '/api/nostr',
          // has: [{ type: 'query', key: 'name' }],
        },
      ]
      // afterFiles: [
      //   // These rewrites are checked after pages/public files
      //   // are checked but before dynamic routes
      //   {
      //     source: '/non-existent',
      //     destination: '/somewhere-else',
      //   },
      // ],
      // fallback: [
      //   // These rewrites are checked after both pages/public files
      //   // and dynamic routes are checked
      //   {
      //     source: '/:path*',
      //     destination: `https://my-old-site.com/:path*`,
      //   },
      // ],
  }
}

module.exports = nextConfig
