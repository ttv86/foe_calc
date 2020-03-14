module.exports = {
    entry: "./Scripts/Index.ts",
    output: {
        path: __dirname + "/Compiled",
        filename: 'app.[name].js'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    mode: "development",

    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    optimization: {
        minimize: false,
        nodeEnv: "development",
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};