module.exports = {
  pwa: {
    workboxOptions: {
      templatedUrls: {
        "/": "index.ssr.html"
      }
    }
  }
};
