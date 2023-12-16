const config = {
  // 开发环境
  development: {
    BASEURL: "https://gem-xtra.pro",
  },
  // 生产环境
  production: {
    // BASEURL: "https://admin.angloamericanmine.net",
    BASEURL: "https://gem-xtra.pro",
  },
};

export default config[process.env.NODE_ENV];
