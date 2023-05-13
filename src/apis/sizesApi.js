import axios from "./axios";
export const sizesApi = {
    async requestAllSize(accessToken) {
        return await axios
            .get(`/sizes`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestSizeById(id, accessToken) {
        return await axios
            .get(`/sizes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateSize(params, accessToken) {
        return await axios
            .put(`/sizes/${params.id}`, { value: params.value }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateSize(data, accessToken) {
        return await axios
            .post(`/sizes`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteSize(id, accessToken) {
        return await axios
            .delete(`/sizes/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
};
