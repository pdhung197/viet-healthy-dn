/* eslint-disable */
const withSass = require("@zeit/next-sass");
const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, "./assets/styles/antd-custom.less"),
    "utf8"
  )
);

module.exports = {
  future: {
    webpack5: true,
  },
  images: {
    deviceSizes: [
      320, 480, 540, 600, 640, 750, 828, 1080, 1200, 1366, 1600, 1920, 2048,
      3840,
    ],
    imageSizes: [
      200, 300, 400, 450, 500, 550, 600, 800, 900, 1000, 1200, 1400, 2048, 3840,
    ],
    domains: ["loremflickr.com", "loremflickr.com", "pdhung.info"],
    loader: "imgix",
    path: "",
  },
  ...withCSS({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    ...withLess(
      withSass({
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: themeVariables, // make your antd custom effective
        },
        webpack: (config, { isServer }) => {
          if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === "function") {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === "function" ? [] : origExternals),
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: "null-loader",
            });
          }
          config.node = {
            // Some libraries import Node modules but don't use them in the browser.
            // Tell Webpack to provide empty mocks for them so importing them works.
            ...config.node,
            fs: "empty",
            child_process: "empty",
            net: "empty",
            tls: "empty",
          };
          return config;
        },
      })
    ),
  }),
};
