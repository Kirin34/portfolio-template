export default ({ env }) => {
  console.log("DATABASE DEBUG >>>", {
    client: 'postgres',
    DATABASE_URL: env('DATABASE_URL'),
    DATABASE_HOST: env('DATABASE_HOST'),
    DATABASE_PORT: env('DATABASE_PORT'),
    DATABASE_NAME: env('DATABASE_NAME'),
    DATABASE_USERNAME: env('DATABASE_USERNAME'),
  });

  const useURL = !!env('DATABASE_URL');

  return {
    connection: {
      client: 'postgres',
      connection: useURL
        ? {
            connectionString: env('DATABASE_URL'),
            ssl: env.bool('DATABASE_SSL', false),
          }
        : {
            host: env('DATABASE_HOST'),
            port: env.int('DATABASE_PORT'),
            database: env('DATABASE_NAME'),
            user: env('DATABASE_USERNAME'),
            password: env('DATABASE_PASSWORD'),
            ssl: env.bool('DATABASE_SSL', false),
          },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      acquireConnectionTimeout: env.int(
        'DATABASE_CONNECTION_TIMEOUT',
        60000
      ),
    },
  };
};
