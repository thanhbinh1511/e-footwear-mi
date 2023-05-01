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
    async requestUpdateGallery(data) {
        console.log(data)
        return await axios
            .put(`/galleries/${data.id}`, { imageURL: data.imageURL, link: data.link, title: data.title, typeGallery: data.typeGallery })
            .then((response) => response)
            .catch((error) => error.response.data);
    }


};