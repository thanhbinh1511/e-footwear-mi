import axios from './axios';
export const productDetailsApi = {
    async requestAllProductDetails() {
        return await axios
            .get(`/details`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteProductDetails(id) {
        return await axios
            .delete(`/details/${id}`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateProductDetails(data) {
        return await axios
            .post(`/details`, data)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateProductDetails(data) {
        return await axios
            .put(`/details/${data.id}`, { stockQuantity: data.stockQuantity, size: data.size, product: data.product })
    }
}