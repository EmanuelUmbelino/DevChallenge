import api, { RequestError } from "./api";

type Credentials = {
    email: string;
    password: string;
}

type LoginSuccess = {
    data: {
        token: string;
        userId: string;
    };
    message: string[];
}

export function Login(credentials: Credentials) {
    return api.post('/auth/signin', credentials);
    // return api.post<LoginSuccess | RequestError>('/signin', credentials);
}