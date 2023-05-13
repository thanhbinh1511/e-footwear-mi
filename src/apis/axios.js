import axios from "axios";
const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
    },
});
// Add a request interceptor
axiosClient.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        // Do something before request is sent
        const customHeaders = {};

        // const accessToken = localStorage.getItem("access_token");

        // if (accessToken) {
        //     customHeaders.Authorization = accessToken;
        // }
        return {
            ...config,
            headers: {
                ...customHeaders,
                ...config.headers,
            },
        };
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default axiosClient;
