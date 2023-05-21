import axios from "./axios";
export const addressApi = {
    async requestAllAddressById(id, accessToken) {
        return await axios
            .get(`/addresses/list/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
};