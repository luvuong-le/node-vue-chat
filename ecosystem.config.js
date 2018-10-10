module.exports = {
  apps: [
    {
      name: "Astro Chat Backend",
      script: "./server/server.js",
      watch: true,
      ignore_watch: [".git", "server/node_modules/", "server/logs/*"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      },
      error_file: "./server/logs/pm2errors.log",
      out_file: "./server/logs/access.log"
    }
  ]
};
