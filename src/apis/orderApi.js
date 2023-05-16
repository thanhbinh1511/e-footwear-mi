import axios from "./axios";
export const orderApi = {
    async requestAllOrder(accessToken) {
        return await axios
            .get(`/orders`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestOrderById(id, accessToken) {
        return await axios
            .get(`/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateOrder(data, accessToken) {
        return await axios
            .put(`/orders`, { id: data.id, status: data.status }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
}