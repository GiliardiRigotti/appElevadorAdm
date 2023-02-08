const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["."],
      alias: {
        "@assets": "./src/assets",
        "@components": "./src/components",
        "@constants": "./src/constants",
        "@contexts": "./src/contexts",
        "@interfaces": "./src/interfaces",
        "@screens": "./src/screens",
        "@services": "./src/services",
        "@utils": "./src/utils",
        "@styles": "./src/styles",
      }
    }
  ]
];

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: plugins
  };
};
