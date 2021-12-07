module.exports = function (api) {
  api.cache(true)
  const presets = [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        useBuiltIns: "usage",
        corejs: {
          version: "3.6",
          proposals: true,
        },
      },
    ],
  ]
  const plugins = ["@babel/plugin-transform-runtime"]
  return {
    presets,
    plugins,
  }
}
