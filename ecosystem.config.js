module.exports = {
  apps: [
    {
      name: 'app',
      script: 'dist/src/main.js',
      instances: 'max',
      max_restarts: 5,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
