import axios from "./axios";
export const productApi = {
    async requestAllProduct() {
        return await axios
            .get(`/products`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};