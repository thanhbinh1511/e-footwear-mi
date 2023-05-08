import axios from './axios';
export const productDetailsApi = {
    async requestAllProductDetails() {
        return await axios
            .get(`/details`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};    
