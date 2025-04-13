import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
    output: 'standalone',
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

module.exports = withBundleAnalyzer(nextConfig);