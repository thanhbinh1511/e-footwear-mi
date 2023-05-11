import axios from "./axios";
export const productApi = {
    async requestAllProduct() {
        return await axios
            .get(`/products`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteProduct(id) {
        return await axios
            .delete(`/products/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateProduct(data) {
        return await axios
            .post(`/products`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateProduct(data) {
        return await axios
            .put(`/products/${data.id}`, { name: data.name, discountRate: data.discountRate, originPrice: data.originPrice, description: data.description, category: data.category, color: data.color, images: data.images })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};