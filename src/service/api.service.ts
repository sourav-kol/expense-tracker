import axios from "axios";
import Router from "next/router";

export const api = axios.create();

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["x-token"] = token;
        }
        return config;
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            // redirect to login page
            Router.replace("auth/sign-in");
        }
        return error;
    }
);