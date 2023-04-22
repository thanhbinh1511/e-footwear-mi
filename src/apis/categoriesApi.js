import axios from "./axios";
export const categoriesApi = {
    async requestAllCategory() {
        return await axios
            .get(`/categories`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};
