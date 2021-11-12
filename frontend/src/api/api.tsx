import axios from "axios";
import { getToken } from "./token";

const api = axios.create({
    baseURL: 'http://localhost:3000'
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token && config && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

export type RequestError = {
    message: string[];
    error: string;
    statusCode: number;
}