import axios from "./axios";
export const customerApi = {
    async requestGetProfile(accessToken, accountId) {
        return await axios
            .get(`/accounts/profile/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCountCustomer(accessToken) {
        return await axios
            .get(`accounts/count`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }

};