import axios from "./axios";
export const typeGalleriesApi = {
    async requestAllTypeGallery(accessToken) {
        return await axios
            .get(`/type-galleries`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestAddTypeGallery(data, accessToken) {
        return await axios
            .post(`/type-galleries`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateTypeGallery(data, accessToken) {
        return await axios
            .put(`/type-galleries/${data.id}`, { typeCode: data.typeCode, typeName: data.typeName }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);

    },
    async requestDeleteTypeGallery(id, accessToken) {
        return await axios
            .delete(`/type-galleries/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);

    }
}
