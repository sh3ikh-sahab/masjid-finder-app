import dotenv from 'dotenv'

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, NODE_ENV, GOOGLE_API_KEY } = process.env;

dotenv.config();

const config = {

    db: {

        host: DB_HOST,

        user: DB_USER,

        password: DB_PASSWORD,

        name: DB_NAME

    },

    googleApiKey: GOOGLE_API_KEY,
    //jwtSecret: JWT_SECRET,
    nodeEnv: NODE_ENV || 'development'

}

export default config;