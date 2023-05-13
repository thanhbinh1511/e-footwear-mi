import axios from "./axios";
export const colorsApi = {
    async requestAllColor(accessToken) {
        return await axios
            .get(`/colors`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestDeleteColor(id, accessToken) {
        return await axios
            .delete(`/colors/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestUpdateColor(params, accessToken) {
        return await axios
            .put(`/colors/${params.id}`, { codeColor: params.codeColor, name: params.name }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestCreateColor(data, accessToken) {
        return await axios
            .post(`/colors`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
};