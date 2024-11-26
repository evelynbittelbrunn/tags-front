import axios from 'axios';

function getToken() {
    return localStorage.getItem('token');
}

const api = axios.create({
    baseURL: 'https://tagsocial.site/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export function REGISTER_POST(body: any) {
    return api.post('/auth/register', body);
}

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
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function GET_TAGS(userId: string) {
    return api.get(`/tags/categories/user-categories/${userId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function POST_TAGS(body: any) {
    return api.post('/tags/user-categories/save', body, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export async function POSTS_GET(pages: number, items: number, currentUserId: string) {
    return api.get(`/tags/posts/find-all?pagination=${pages}&items=${items}&currentUserId=${currentUserId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function POSTS_BY_USER_GET(pages: number, items: number, userId: string, currentUserId: string) {
    return api.get(`/tags/posts/${userId}?pagination=${pages}&items=${items}&currentUserId=${currentUserId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function GET_USER_PROFILE(userId: string, currentUserId: string) {
    return api.get(`/tags/users/profile/${userId}?currentUserId=${currentUserId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function PUT_USER_PROFILE(userId: string, body: any) {
    return api.put(`/tags/users/profile/${userId}`, body, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function POST_FOLLOW(followerId: string, followedId: string) {
    return api.post(`/tags/follow?followerId=${followerId}&followedId=${followedId}`, null, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function POST_LIKE(currentUserId: string, postId: string) {
    return api.post(`/tags/like?userId=${currentUserId}&postId=${postId}`, null, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function DELETE_POST(postId: string) {
    return api.delete(`/tags/posts/delete-post/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function GET_COMMENT(postId: string) {
    return api.get(`/tags/comments/post/${postId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function POST_COMMENT(body: any) {
    return api.post(`/tags/comments`, body, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function DELETE_COMMENT(commentId: string) {
    return api.delete(`/tags/comments/${commentId}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}

export function GET_ACCOUNTS(pages: number, items: number, query: string) {
    return api.get(`/tags/users/search?name=${query}&pagination=${pages}&items=${items}`, {
        headers: {
            Authorization: 'Bearer ' + getToken(),
        },
    });
}