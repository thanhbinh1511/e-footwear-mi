import axios from "./axios";
export const productApi = {
    async requestAllProduct(accessToken) {
        return await axios
            .get(`/products`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteProduct(id, accessToken) {
        return await axios
            .delete(`/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateProduct(data, accessToken) {
        return await axios
            .post(`/products`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateProduct(data, accessToken) {
        return await axios
            .put(`/products/${data.id}`, { name: data.name, discountRate: data.discountRate, originPrice: data.originPrice, description: data.description, category: data.category, color: data.color, images: data.images }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};