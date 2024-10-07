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