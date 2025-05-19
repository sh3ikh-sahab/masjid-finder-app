import knex from 'knex';
import knexConfig from '../knexfile.js';
import config from '../config.js';

const db = knex(knexConfig[config.nodeEnv]);

export default db;
