import axios from "./axios";
export const couponsApi = {
    async requestAllCoupon(accessToken) {
        return await axios
            .get(`/coupons`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateCoupon(params, accessToken) {
        return await axios
            .put(`/coupons/${params.id}`, { code: params.code, maxUsage: params.maxUsage, price: params.price, endTime: params.endTime }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateCoupon(params, accessToken) {
        return await axios
            .post(`/coupons`, params, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
}
