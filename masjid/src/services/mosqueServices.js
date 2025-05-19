import axios from 'axios';
import { insertMosque, getMosqueByCoordinates, getMosquesWithTimingsFromDB } from '../models/mosqueModel.js';
import { updateTiming, getTimingByMosqueId } from '../models/timingModel.js';
import config from '../../config.js';

export const getNearbyMosques = async (latitude, longitude, radius) => {
    try {
        let mosques = await getMosqueByCoordinates(latitude, longitude, radius);

        if (mosques.length === 0) {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longitude}`,
                    radius,
                    type: 'mosque',
                    key: config.googleApiKey,
                },
            });

            const results = response.data.results;

            mosques = await Promise.all(results.map(async result => {
                const { name, vicinity, geometry } = result;
                const { lat, lng } = geometry.location;
                const mosqueId = await insertMosque(name, vicinity, lat, lng);
                return { id: mosqueId, name, address: vicinity, latitude: lat, longitude: lng };
            }));
        }

        return mosques;
    } catch (error) {
        console.error('Error fetching or inserting mosques:', error);
        throw new Error('Failed to fetch or insert mosques');
    }
};

const fetchPrayerTimings = async (latitude, longitude, date) => {
    try {
        const response = await axios.get(`http://api.aladhan.com/v1/timings/${date}`, {
            params: {
                latitude,
                longitude,
                method: 2,
            },
        });

        return response.data.data.timings;
    } catch (error) {
        console.error('Error fetching prayer timings:', error);
        throw new Error('Failed to fetch prayer timings');
    }
};

export const updateMosqueTimings = async (mosqueId, latitude, longitude, date) => {
    try {
        const timings = await fetchPrayerTimings(latitude, longitude, date);
        await updateTiming(mosqueId, timings);
    } catch (error) {
        console.error('Error updating mosque timings:', error);
        throw new Error('Failed to update mosque timings');
    }
};

export const getMosquesWithTimings = async (latitude, longitude, radius) => {
    try {
        let mosques = await getMosqueByCoordinates(latitude, longitude, radius);

        if (mosques.length === 0) {
            const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
                params: {
                    location: `${latitude},${longitude}`,
                    radius,
                    type: 'mosque',
                    key: config.googleApiKey,
                },
            });

            const results = response.data.results;

            mosques = await Promise.all(results.map(async result => {
                const { name, vicinity, geometry } = result;
                const { lat, lng } = geometry.location;
                const mosqueId = await insertMosque(name, vicinity, lat, lng);
                return { id: mosqueId, name, address: vicinity, latitude: lat, longitude: lng };
            }));
        }

        const mosquesWithTimings = await Promise.all(mosques.map(async mosque => {
            let timings = await getTimingByMosqueId(mosque.id);

            if (!timings) {
                const date = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
                timings = await fetchPrayerTimings(mosque.latitude, mosque.longitude, date);
                await updateTiming(mosque.id, timings);
            }

            return { ...mosque, timings };
        }));

        return mosquesWithTimings;
    } catch (error) {
        console.error('Error fetching mosques with timings:', error);
        throw new Error('Failed to fetch mosques with timings');
    }
};
