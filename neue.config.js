module.exports = {
  /**
   * Plugins
   */
  plugins: {
    // This plugin will be installed on both side
    httpClient: "@/plugins/httpClient"
  },

  /**
   * Install a minimal API for auth example
   */
  ssr: {
    server(app) {
      require("./api")(app);
    }
  }
};
