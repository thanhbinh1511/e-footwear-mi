import axios from "./axios";
export const galleriesApi = {
    async requestAllGallery(accessToken) {
        return await axios
            .get(`/galleries`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteGallery(id, accessToken) {
        return await axios
            .delete(`/galleries/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateGallery(params, accessToken) {
        return await axios
            .post(`/galleries`, params, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateGallery(data, accessToken) {
        return await axios
            .put(`/galleries/${data.id}`, { imageURL: data.imageURL, link: data.link, title: data.title, typeGallery: data.typeGallery }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }


};