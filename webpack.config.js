const path = require('path');

const webpack = require('webpack');

module.exports  = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    //when we save a change in a file, recompile the bundle
    watch: true,
    module:{
        loaders: [
            {
                //scan js files
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            }
        ]
    }
}
