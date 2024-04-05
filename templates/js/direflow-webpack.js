const { webpackConfig } = require('direflow-scripts');

module.exports = (config, env) => {
  const direflowWebpackConfig = webpackConfig(config, env);

  return {
    ...direflowWebpackConfig,
    output: {
      ...direflowWebpackConfig.output,
      // Ensure the module format is set to CommonJS for Node.js compatibility
      libraryTarget: 'commonjs2',
    },
    // Targeting Node.js, we don'o't want Webpack to polyfill or mock certain Node.js globals and built-in modules
    target: 'node',
    // Exclude 'node_modules' from the output bundle
    externals: [...(direflowWebpackConfig.externals || []), /node_modules/],
  };
};