import axios from "./axios";
export const galleriesApi = {
    async requestAllGallery() {
        return await axios
            .get(`/galleries`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteGallery(id) {
        return await axios
            .delete(`/galleries/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateGallery(params) {
        return await axios
            .post(`/galleries`, params)
            .then((response) => response)
            .catch((error) => error.response.data);
    },


};