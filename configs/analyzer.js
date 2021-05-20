process.env.NODE_ENV='production';
const webpack = require('webpack');
const chalk = require('chalk');

const PreloadWebpackPlugin = require('preload-webpack-plugin');
const progressBarPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webPackConfigProd = require('react-scripts/config/webpack.config')('production');

const green = text => chalk.green.bold(text);

webPackConfigProd.plugins.push(new BundleAnalyzer())

webPackConfigProd.plugins.push(new HtmlWebpackPlugin())


// webPackConfigProd.plugins.push(new PreloadWebpackPlugin())

webPackConfigProd.plugins.push(new progressBarPlugin({
    format : `${green('analyzing ...')} ${green('bar')}`
}))


webpack(webPackConfigProd,(err, stat)=>{
    if(err || stat.hasErrors()){
        console.error(err)
    }
});