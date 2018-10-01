module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": __dirname + "/client"
      }
    },
    entry: {
      app: "./client/main.js"
    }
  }
};
