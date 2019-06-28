const path = require('path')  //引入path
const HTMLPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'stylus-loader'
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            //图片文件打包loader
            {
                test: /\.(jpg|jpeg|png)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //placeholder 占位符
                            outputPath: 'images',
                            name: '[name]_[hash].[ext]',
                            limit: 1048 * 2 //如果图片大小超过2048字节的话，就生成图片，否则生成base64
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            title: "webpack-study",
            filename: 'index.html',
            template: './public/index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true
    }
}