const PROXY_CONFIG = [
  {
    context: [
      "/my",
      "/many",
      "/endpoints",
      "/i",
      "/need",
      "/to",
      "/proxy",
      "/commune"
    ],
    target: "http://localhost:8080",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
