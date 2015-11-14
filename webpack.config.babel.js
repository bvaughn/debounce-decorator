'use strict';
import fs from 'fs';
import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import merge from 'webpack-merge';
import React from 'react';
import ReactDOM from 'react-dom/server';
import MTRC from 'markdown-to-react-components';

import pkg from './package.json';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const config = {
  paths: {
    dist: path.join(ROOT_PATH, 'dist'),
    source: path.join(ROOT_PATH, 'source'),
    tests: path.join(ROOT_PATH, 'tests'),
    vendor: path.join(ROOT_PATH, 'vendor')
  },
  filename: 'boilerplate',
  library: 'Boilerplate'
};

process.env.BABEL_ENV = TARGET;

const common = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.css', '.png', '.jpg'],
    root: ROOT_PATH
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loaders: ['eslint'],
        include: [
          config.paths.source
        ]
      }
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(ROOT_PATH, 'package.json')
      }
    ]
  }
};

if (TARGET === 'test' || TARGET === 'tdd') {
  module.exports = merge(common, {
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loaders: ['eslint'],
          include: [
            config.paths.tests
          ]
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          loaders: ['babel'],
          include: [
            config.paths.source,
            config.paths.tests,
            config.paths.vendor
          ]
        }
      ]
    }
  })
}


const distCommon = {
  devtool: 'source-map',
  output: {
    path: config.paths.dist,
    libraryTarget: 'umd',
    library: config.library
  },
  entry: config.paths.source,
  externals: {
    'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'React',
        root: 'React'
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: config.paths.source
      }
    ]
  }
};

if (TARGET === 'dist') {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + '.js'
    }
  });
}

if (TARGET === 'dist-min') {
  module.exports = merge(distCommon, {
    output: {
      filename: config.filename + '.min.js'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
