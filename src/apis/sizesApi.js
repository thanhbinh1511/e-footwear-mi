import axios from "./axios";
export const sizesApi = {
    async requestAllSize() {
        return await axios
            .get(`/sizes`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestSizeById(id) {
        return await axios
            .get(`/sizes/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateSize(params) {
        return await axios
            .put(`/sizes/${params.id}`, { value: params.value })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateSize(data) {
        return await axios
            .post(`/sizes`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteSize(id) {
        return await axios
            .delete(`/sizes/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    }
};
