import axios from "./axios";
export const categoriesApi = {
    async requestAllCategory(accessToken) {
        return await axios
            .get(`/categories`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteCategory(id, accessToken) {
        return await axios
            .delete(`/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateCategory(data, accessToken) {
        return await axios
            .post(`/categories`, { name: data.name, category: data.category }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateCategory(data, accessToken) {
        return await axios
            .put(`/categories/${data.id}`, { name: data.name, category: data.category }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};
