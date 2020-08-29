const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

// Both server + app use this base config
const baseConfig = {
  devtool: 'inline-source-map',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};

// Server allows usage of node (because it targets node)
const serverConfig = {
  ...baseConfig,
  entry: path.resolve(__dirname, 'src/server/index.ts'),
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  node: {
    __dirname: false,
  },
};

// Client by default targets web, so no need to specify target
const clientConfig = {
  ...baseConfig,
  entry: path.resolve(__dirname, 'src/app/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist/static'),
    filename: 'app.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/app/static'),
          to: path.resolve(__dirname, 'dist/static'),
        },
      ],
    }),
  ],
};

// Use both server + client when running webpack
module.exports = [serverConfig, clientConfig];
