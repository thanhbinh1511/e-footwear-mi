import axios from './axios';
export const productDetailsApi = {
    async requestAllProductDetails(accessToken) {
        return await axios
            .get(`/details`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteProductDetails(id, accessToken) {
        return await axios
            .delete(`/details/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateProductDetails(data, accessToken) {
        return await axios
            .post(`/details`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateProductDetails(data, accessToken) {
        return await axios
            .put(`/details/${data.id}`, { stockQuantity: data.stockQuantity, size: data.size, product: data.product }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
    }
}