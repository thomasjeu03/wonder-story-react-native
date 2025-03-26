import axios from 'axios';

const URL = "https://wonder-story.app"

export async function getStoryById(id) {
    try {
        const response = await axios.get(`${URL}/api/story/${id}`);
        return response.data.story;
    } catch (error) {
        console.error("Erreur lors de la récupération des données de l'histoire", error);
        throw error;
    }
}

export async function getStories(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/stories`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.stories;
    } catch (error) {
        console.error("Error while fetching user stories", error);
        throw error;
    }
}

export async function getCaracterTags(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/caracterTags`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.caracterTags;
    } catch (error) {
        console.error("Error while fetching caracter tags", error);
        throw error;
    }
}

export async function getCaracters(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/caracters`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.caracters;
    } catch (error) {
        console.error("Error while fetching caracters", error);
        throw error;
    }
}

export async function getPlaceTags(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/placeTags`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.placeTags;
    } catch (error) {
        console.error("Error while fetching place tags", error);
        throw error;
    }
}

export async function getPlaces(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/places`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.places;
    } catch (error) {
        console.error("Error while fetching places", error);
        throw error;
    }
}