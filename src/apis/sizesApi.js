import axios from "./axios";
export const sizesApi = {
    async requestAllSize() {
        return await axios
            .get(`/sizes`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};
