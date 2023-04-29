import axios from "./axios";
export const categoriesApi = {
    async requestAllCategory() {
        return await axios
            .get(`/categories`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteCategory(id) {
        return await axios
            .delete(`/categories/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateCategory(data) {
        return await axios
            .post(`/categories`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateCategory(id, data) {
        return await axios
            .put(`/categories/${id}`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },

};
