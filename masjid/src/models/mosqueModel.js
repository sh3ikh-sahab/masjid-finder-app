import knex from '../../db/db.js';

export const insertMosque = async (name, address, latitude, longitude) => {
    const [id] = await knex('mosques').insert({ name, address, latitude, longitude }).returning('id');
    return id;
};

export const getMosqueByCoordinates = async (latitude, longitude, radius) => {
    const mosques = await knex('mosques')
        .select('*')
        .whereRaw(
            `ST_Distance_Sphere(point(longitude, latitude), point(?, ?)) <= ?`,
            [longitude, latitude, radius]
        );
    return mosques;
};

export const getMosquesWithTimingsFromDB = async () => {
    const mosques = await knex('mosques')
        .join('timings', 'mosques.id', '=', 'timings.mosque_id')
        .select('mosques.*', 'timings.*');
    return mosques;
};
