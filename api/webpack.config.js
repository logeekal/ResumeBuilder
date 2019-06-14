const webpack = require("webpack");

const path =  require("path");
const nodeExternals = require('webpack-node-externals')

module.exports ={
    mode: 'development',
    context : __dirname,
    entry :[
        './app.js'
    ],

    output : {
        path : __dirname,
        publicPath : '/',
        filename : "bundle.js"
    },
    plugins :[new webpack.HotModuleReplacementPlugin()],
    externals : [nodeExternals()],
    target: 'node',
//   module : {  rules :[
//         {
//             test : path.resolve(__dirname,'/bin/www'),
//             loader : 'shebang-loader'
//         }
//     ]}


};