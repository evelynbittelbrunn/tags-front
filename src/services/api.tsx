import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function LOGIN_POST(body: any) {
    return api.post('/auth/login', body);
}

export function TOKEN_VALIDATE_POST(token: string) {
    return api.post('/auth/validate-token', null, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}

export function USER_GET(token: string) {
    return api.get('/auth/validate-token', {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}