import axios from "./axios";

export const authApi = {
    async requestLogin(params) {
        return await axios
            .post("/accounts/login", {
                username: params.username,
                password: params.password,
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    },
    async requestAllAccount(accessToken) {
        return await axios
            .get("/accounts", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response) => response)
            .catch((error) => error.response.data);
    }
};