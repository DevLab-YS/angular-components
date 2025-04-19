const path = require('path');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const { watch } = require('fs');
const { output } = require('@angular/core');

module.exports = {
    watch: true,
    plugins: [
        new MergeJsonWebpackPlugin({
            output: {
                groupBy: [
                    {
                        pattern: './src/lib/**/*.en.json',
                        fileName: 'assets/i18n/en.json'
                    },
                    {
                        pattern: './src/lib/**/*.es.json',
                        fileName: 'assets/i18n/es.json'
                    }
                ]
            },
            space: 4
        })
    ],
    output: {
        publicPath: '/'
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist/assets'),
            publicPath: '/assets'
        }
    }
};
