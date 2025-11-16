import path from 'path';

export default ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');

  // DEBUG LOG – capiamo cosa sta leggendo Strapi veramente
  console.log("DATABASE DEBUG >>>", {
    client,
    DATABASE_URL: env('DATABASE_URL'),
    DATABASE_HOST: env('DATABASE_HOST'),
    DATABASE_PORT: env('DATABASE_PORT'),
    DATABASE_NAME: env('DATABASE_NAME'),
    DATABASE_USERNAME: env('DATABASE_USERNAME'),
    DATABASE_PASSWORD: env('DATABASE_PASSWORD') ? "***" : null,
    DATABASE_SSL: env('DATABASE_SSL'),
  });

  // Se esiste DATABASE_URL, ignoriamo tutto il resto (Railway funziona così)
  const useURL = !!env('DATABASE_URL');

  const connections = {
    postgres: {
      connection: useURL
        ? {
            connectionString: env('DATABASE_URL'),
            ssl: env.bool('DATABASE_SSL', false),
          }
        : {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: env.bool('DATABASE_SSL', false),
          },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },

    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false),
      },
      pool: { min: 2, max: 10 },
    },

    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  // Se il client non esiste tra quelli definiti → errore chiaro
  if (!connections[client]) {
    throw new Error(`Invalid DATABASE_CLIENT: ${client}`);
  }

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
