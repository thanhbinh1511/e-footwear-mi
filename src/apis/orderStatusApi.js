import axios from "./axios";
export const orderStatusApi = {
    async requestOrderStatus(access_token) {
        return await axios
            .get(`/order_status`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCountByDescription(access_token) {
        return await axios
            .get(`/order_status/count`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
}