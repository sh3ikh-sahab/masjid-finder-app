import knex from '../../db/db.js';

export const updateTiming = async (mosqueId, timings) => {
    await knex('timings').insert({
        mosque_id: mosqueId,
        fajr: timings.Fajr,
        dhuhr: timings.Dhuhr,
        asr: timings.Asr,
        maghrib: timings.Maghrib,
        isha: timings.Isha,
    }).onConflict('mosque_id').merge();
};

export const getTimingByMosqueId = async (mosqueId) => {
    const timing = await knex('timings').where({ mosque_id: mosqueId }).first();
    return timing;
};
