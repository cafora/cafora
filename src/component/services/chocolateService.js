// src/services/chocolateService.js
import axios from 'axios';

const API_URL = 'https://server-blpu.onrender.com/product';

const chocolateService = {
    getAllChocolates: async (authToken,page,limit) => {
        try {
            const response = await axios.get(`${API_URL}/get-product`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
                params: {
                    page: page,
                    limit: limit,
                }
            });
            return response.data.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    getChocolate: async (id, authToken) => {
        try {
            const response = await axios.get(`${API_URL}/get-product/${id}`,{
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                },
            });
            return response.data.data;
        } catch (error) {
            throw error.response.data;
        }
    },

};

export default chocolateService;
