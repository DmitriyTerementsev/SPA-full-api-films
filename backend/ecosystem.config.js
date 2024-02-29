module.exports = {
  apps: [
    {
      name: 'movies-auto-deploy',
      script: './app.js',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  // Deployment Configuration
  deploy: {
    production: {
      user: 'trmntsv',
      host: '51.250.9.252',
      ref: 'origin/main',
      repo: 'git@github.com:Alchimik981/movies-explorer-api.git',
      path: '/home/trmntsv/auto-deploy',
      'pre-deploy-local': 'scp .env trmntsv@51.250.9.252:/home/trmntsv/auto-deploy/current/backend',
      'post-deploy': 'pwd && cd backend && npm i && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
