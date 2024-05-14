const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  // publicPath: "/vj0aLy4UIj/",
  configureWebpack: {
    devtool: 'source-map',
  },
  devServer: {
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws',
    },
    allowedHosts: 'all',
  },
};
