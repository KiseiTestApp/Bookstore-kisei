import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "firebasestorage.googleapis.com",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    trailingSlash: true,
};

module.exports = nextConfig;