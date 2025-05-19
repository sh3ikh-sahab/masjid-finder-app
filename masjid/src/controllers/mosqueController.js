import { getNearbyMosques, updateMosqueTimings, getMosquesWithTimings } from '../services/mosqueServices.js';

const getNearbyMosquesHandler = async (req, res) => {
    const { lat, lng, radius } = req.query;

    try {
        const mosques = await getNearbyMosques(lat, lng, radius);
        res.json(mosques);
    } catch (error) {
        console.error('Error fetching or inserting mosques:', error);
        res.status(500).json({ error: 'Failed to fetch or insert mosques' });
    }
};

const updateMosqueTimingsHandler = async (req, res) => {
    const { mosqueId, lat, lng, date } = req.body;

    if (!mosqueId || !lat || !lng || !date) {
        return res.status(400).json({ error: 'mosqueId, lat, lng, and date are required' });
    }

    try {
        await updateMosqueTimings(mosqueId, lat, lng, date);
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating mosque timings:', error);
        res.status(500).json({ error: 'Failed to update mosque timings', details: error.message });
    }
};

const getMosquesWithTimingsHandler = async (req, res) => {
    const { lat, lng, radius } = req.query;

    try {
        const mosquesWithTimings = await getMosquesWithTimings(lat, lng, radius);
        res.json(mosquesWithTimings);
    } catch (error) {
        console.error('Error fetching mosques with timings:', error);
        res.status(500).json({ error: 'Failed to fetch mosques with timings' });
    }
};

export { getNearbyMosquesHandler, updateMosqueTimingsHandler, getMosquesWithTimingsHandler };
