import axios from 'axios';

const token = localStorage.getItem('token');

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

export function NEW_POST(body: any) {
    return api.post('/tags/posts/create', body, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}

export function GET_TAGS(userId: string) {
    return api.get(`/tags/categories/user-categories/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}

export function POST_TAGS(body: any) {
    return api.post('/tags/user-categories/save', body, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}

export function POSTS_GET(pages: number, items: number) {
    return api.get(`/tags/posts?pagination=${pages}&items=${items}`, {
        headers: {
            Authorization: 'Bearer ' + token,
        },
    });
}