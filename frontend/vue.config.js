module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        data: `
          @import "./src/assets/style.scss";
        `
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
};
