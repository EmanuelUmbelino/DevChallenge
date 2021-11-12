import api, { RequestError } from "./api";

type Credentials = {
    email: string;
    password: string;
}

type User = {
    email: string;
    name: string;
    password: string;
    passwordConfirmation: string;
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

export function SignUp(user: User) {
    return api.post('/auth/signup', user);
    // return api.post<LoginSuccess | RequestError>('/signup', user);
}