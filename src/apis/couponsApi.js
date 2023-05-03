import axios from "./axios";
export const couponsApi = {
    async requestAllCoupon() {
        return await axios
            .get(`/coupons`)
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateCoupon(params) {
        return await axios
            .put(`/coupons/${params.id}`, { code: params.code, maxUsage: params.maxUsage, price: params.price, endTime: params.endTime })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateCoupon(params) {
        return await axios
            .post(`/coupons`, params)
            .then((response) => response)
            .catch((error) => error.response.data);
    }
}
