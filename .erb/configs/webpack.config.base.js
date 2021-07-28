/**
 * Base webpack config used across other specific configs
 */

import path from 'path';
import webpack from 'webpack';
import { dependencies as externals } from '../../src/package.json';

export default {
  externals: [...Object.keys(externals || {}), 'bufferutil', 'utf-8-validate'],

  module: {
    rules: [
      {
        test: /\.ts|\.tsx|\.jsx|\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },

      {
        test: /\.apk?$/,
        use: {
          loader: 'file-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /PrintDeps\.exe?$/,
        use: {
          loader: 'file-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /.*web\/recorder.*\.png|\.html|\.ttf/,
        use: {
          loader: 'file-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },

  output: {
    path: path.join(__dirname, '../../src'),
    // https://github.com/webpack/webpack/issues/1114
    libraryTarget: 'commonjs2',
  },

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [path.join(__dirname, '../src'), 'node_modules'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
};
