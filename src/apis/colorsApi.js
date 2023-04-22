import axios from "./axios";
export const colorsApi = {
    async requestAllColor() {
        return await axios
            .get(`/colors`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteColor(id) {
        return await axios
            .delete(`/colors/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateColor(params) {
        return await axios
            .put(`/colors/${params.id}`, { codeColor: params.codeColor, name: params.name })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateColor(data) {
        return await axios
            .post(`/colors`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};