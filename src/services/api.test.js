import axios from 'axios';
import * as api from './api';  // Altere para o caminho correto do seu arquivo

// Mock do axios
jest.mock('axios');

describe('API Functions', () => {
    const mockToken = 'mockToken';
    const mockUser = { id: 'mockUserId', name: 'John Doe' };
    const mockErrorMessage = 'Invalid credentials';
    const mockResponse = { data: mockUser };

    // Mock de localStorage
    beforeEach(() => {
        localStorage.setItem('token', mockToken);
    });

    afterEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it('REGISTER_POST should send a post request', async () => {
        const body = { email: 'test@example.com', password: 'password' };
        axios.post.mockResolvedValueOnce(mockResponse);

        const result = await api.REGISTER_POST(body);
        expect(axios.post).toHaveBeenCalledWith('/auth/register', body);
        expect(result.data).toEqual(mockUser);
    });

    it('LOGIN_POST should send a post request and return data', async () => {
        const body = { email: 'test@example.com', password: 'password' };
        axios.post.mockResolvedValueOnce(mockResponse);

        const result = await api.LOGIN_POST(body);
        expect(axios.post).toHaveBeenCalledWith('/auth/login', body);
        expect(result.data).toEqual(mockUser);
    });

    it('LOGIN_POST should handle error correctly', async () => {
        const body = { email: 'test@example.com', password: 'wrongpassword' };
        axios.post.mockRejectedValueOnce(new Error(mockErrorMessage));

        try {
            await api.LOGIN_POST(body);
        } catch (error) {
            expect(error.message).toBe(mockErrorMessage);
        }
    });

    it('GET_TAGS should send a GET request', async () => {
        const userId = 'mockUserId';
        const expectedUrl = `/tags/categories/user-categories/${userId}`;
        axios.get.mockResolvedValueOnce(mockResponse);

        const result = await api.GET_TAGS(userId);
        expect(axios.get).toHaveBeenCalledWith(expectedUrl, {
            headers: { Authorization: `Bearer ${mockToken}` },
        });
        expect(result.data).toEqual(mockUser);
    });

    it('POST_TAGS should send a post request', async () => {
        const body = { userId: 'mockUserId', categoryIds: [1, 2, 3] };
        axios.post.mockResolvedValueOnce(mockResponse);

        const result = await api.POST_TAGS(body);
        expect(axios.post).toHaveBeenCalledWith('/tags/user-categories/save', body, {
            headers: { Authorization: `Bearer ${mockToken}` },
        });
        expect(result.data).toEqual(mockUser);
    });

    it('POST_LIKE should send a post request for like action', async () => {
        const currentUserId = 'mockUserId';
        const postId = 'mockPostId';
        axios.post.mockResolvedValueOnce(mockResponse);

        const result = await api.POST_LIKE(currentUserId, postId);
        expect(axios.post).toHaveBeenCalledWith(
            `/tags/like?userId=${currentUserId}&postId=${postId}`,
            null,
            { headers: { Authorization: `Bearer ${mockToken}` } }
        );
        expect(result.data).toEqual(mockUser);
    });

    it('POST_FOLLOW should send a post request for follow action', async () => {
        const followerId = 'mockFollowerId';
        const followedId = 'mockFollowedId';
        axios.post.mockResolvedValueOnce(mockResponse);

        const result = await api.POST_FOLLOW(followerId, followedId);
        expect(axios.post).toHaveBeenCalledWith(
            `/tags/follow?followerId=${followerId}&followedId=${followedId}`,
            null,
            { headers: { Authorization: `Bearer ${mockToken}` } }
        );
        expect(result.data).toEqual(mockUser);
    });

    it('USER_GET should send a GET request', async () => {
        axios.get.mockResolvedValueOnce(mockResponse);

        const result = await api.USER_GET(mockToken);
        expect(axios.get).toHaveBeenCalledWith('/auth/validate-token', {
            headers: { Authorization: `Bearer ${mockToken}` },
        });
        expect(result.data).toEqual(mockUser);
    });

    it('DELETE_POST should send a DELETE request for a post', async () => {
        const postId = 'mockPostId';
        axios.delete.mockResolvedValueOnce(mockResponse);

        const result = await api.DELETE_POST(postId);
        expect(axios.delete).toHaveBeenCalledWith(`/tags/posts/delete-post/${postId}`, {
            headers: { Authorization: `Bearer ${mockToken}` },
        });
        expect(result.data).toEqual(mockUser);
    });

    it('POSTS_GET should send a GET request', async () => {
        const pages = 1;
        const items = 10;
        const currentUserId = 'mockUserId';
        axios.get.mockResolvedValueOnce(mockResponse);

        const result = await api.POSTS_GET(pages, items, currentUserId);
        expect(axios.get).toHaveBeenCalledWith(
            `/tags/posts/find-all?pagination=${pages}&items=${items}&currentUserId=${currentUserId}`,
            { headers: { Authorization: `Bearer ${mockToken}` } }
        );
        expect(result.data).toEqual(mockUser);
    });
});
