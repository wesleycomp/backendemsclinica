// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'apiems',
    cwd: '/home/app/backendemsclinica',
    script: 'dist/shared/http/server.js',
    node_args: '-r dotenv/config -r module-alias/register', // <- importante
    env: {
      NODE_ENV: 'production',
      APP_API_PORT: '3333',
      DOTENV_CONFIG_PATH: '/home/app/backendemsclinica/.env.production'
    }
  }]
};
