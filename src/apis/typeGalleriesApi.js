import axios from "./axios";
export const typeGalleriesApi = {
    async requestAllTypeGallery() {
        return await axios
            .get(`/type-galleries`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestAddTypeGallery(data) {
        return await axios
            .post(`/type-galleries`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateTypeGallery(data) {
        return await axios
            .put(`/type-galleries/${data.id}`, { typeCode: data.typeCode, typeName: data.typeName })
            .then((response) => response)
            .catch((error) => error.response.data);

    },
    async requestDeleteTypeGallery(id) {
        return await axios
            .delete(`/type-galleries/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);

    }


}
