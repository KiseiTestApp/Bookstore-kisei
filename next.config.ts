import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
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

module.exports = bundleAnalyzer(nextConfig);