module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT'), // usare SEMPRE SOLO env.PORT su Railway
  app: {
    keys: env.array('APP_KEYS'),
  },
});
