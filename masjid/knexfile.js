import 'dotenv/config';
import config from './config.js'
import { postProcessResponse, wrapIdentifier } from './utilities.js';

const knexConfig = {

  development: {

    client: 'mysql',

    connection: {

      host: config.db.host || '127.0.0.1',

      user: config.db.user || 'root',

      password: config.db.password || '',

      database: config.db.name || 'myapp_test'

    },

    pool: {

      min: 2,

      max: 10

    },

    migrations: {

      directory: './db/migrations'

    },

    seeds: {

      directory: './db/seeds'

    },

    postProcessResponse,

    wrapIdentifier,

  }

};

export default knexConfig;