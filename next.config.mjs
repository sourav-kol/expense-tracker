/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    webpack(config, { isServer }) {
        config.externals = config.externals || {};
        // if (!isServer) {
        //     config.externals = {
        //         'react': 'React',
        //         'react-dom': 'ReactDOM',
        //         'lodash': '_',
        //         'antd': 'antd',
        //         'next': 'next'
        //     }
        // };
        config.module.rules.push({
            test: /\.node$/,
            use: ["node-loader"],
        });
        return config;
    },
    reactStrictMode: false,
    transpilePackages: [
        "antd"
    ],
    output: "standalone",
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
    },
    compiler: {
        //removeConsole: process.env.NODE_ENV === "production",
    },
    sassOptions: {
        fiber: false,
    },
    modularizeImports: {
        antd4: {
            transform: 'antd4/lib/{{kebabCase member}}',
        }
    }
};

export default nextConfig;
