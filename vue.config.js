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
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/abstract/mixins.scss";`
      }
    }
  }
};
