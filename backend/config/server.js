//module.exports = ({ env }) => ({
//  host: env('HOST', '0.0.0.0'),
//  port: env.int('PORT', 1337),
//  app: {
//    keys: env.array('APP_KEYS'),
//  },
//  webhooks: {
//    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
//  },
//});
 module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
//  socket: '/tmp/nginx.socket', // only use if absolutely required
  emitErrors: false,
  // url: env('PUBLIC_URL', 'https://borg.licejus.lt'),
  url: env('PUBLIC_URL', 'https://bebras.org'),
  // url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: env.bool('IS_PROXIED', true),
  cron: {
    enabled: env.bool('CRON_ENABLED', false),
  },
  settings: {
    cors: {
      origin: ['*'],
    },
  },
admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'omitted'),
    },
  },

});
