import axios from "axios";
import Router from "next/router";

export const api = axios.create();

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.status === 401) {
            // redirect to login page
            Router.push("auth/sign-in");
        }
        return error;
    }
);