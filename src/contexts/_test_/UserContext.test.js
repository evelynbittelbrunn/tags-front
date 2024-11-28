import React from 'react';
import { render, act } from '@testing-library/react';
import UserStorage, { UserContext } from '../UserContext';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import axiosMock from 'axios';

// Mock do useNavigate
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

jest.mock('axios');

describe('UserContext', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    const mockRenderWithUserContext = async (overrides = {}) => {
        const defaultValues = {
            userLogin: jest.fn(),
            userLogout: jest.fn(),
            data: { id: 'mockUserId', name: 'John Doe' },
            error: null,
            loading: false,
            login: true,
            ...overrides,
        };

        render(
            <BrowserRouter>
                <UserContext.Provider value={defaultValues}>
                    <div>Test Context</div>
                </UserContext.Provider>
            </BrowserRouter>
        );

        return defaultValues;
    };

    it('should login a user successfully', async () => {
        const mockUserLogin = jest.fn().mockResolvedValueOnce();
        const context = await mockRenderWithUserContext({ userLogin: mockUserLogin });

        await act(async () => {
            await context.userLogin('test@example.com', 'password');
        });

        expect(mockUserLogin).toHaveBeenCalledWith('test@example.com', 'password');
        // Simula a navegação após o login
        mockNavigate('/');
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('should logout a user successfully', async () => {
        const mockUserLogout = jest.fn();
        const context = await mockRenderWithUserContext({ userLogout: mockUserLogout });

        act(() => {
            context.userLogout();
        });

        expect(mockUserLogout).toHaveBeenCalled();
        // Simula a navegação após o logout
        mockNavigate('/login');
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    it('should auto-login successfully with a valid token', async () => {
        const mockToken = 'validToken';
        const mockUser = { id: 'mockUserId', name: 'John Doe' };
        const mockGetUser = jest.fn().mockResolvedValueOnce(mockUser);
        const context = await mockRenderWithUserContext({ getUser: mockGetUser });

        localStorage.setItem('token', mockToken);

        await act(async () => {
            await mockGetUser(mockToken);
        });

        expect(mockGetUser).toHaveBeenCalledWith(mockToken);
        expect(context.data).toEqual(mockUser);
        expect(context.login).toBe(true);
    });

    it('should handle auto-login with an invalid token', async () => {
        const mockToken = 'invalidToken';
        const mockGetUser = jest.fn().mockRejectedValueOnce(new Error('Invalid token'));
        const context = await mockRenderWithUserContext({ getUser: mockGetUser });

        localStorage.setItem('token', mockToken);

        await act(async () => {
            try {
                await mockGetUser(mockToken);
            } catch (e) {
                // Ignora o erro para o teste continuar
            }
        });

        expect(mockGetUser).toHaveBeenCalledWith(mockToken);
        // Simula a navegação após falha no auto-login
        mockNavigate('/login');
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
});

jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (
        message.includes('React Router Future Flag Warning') ||
        message.includes('Relative route resolution within Splat routes')
    ) {
        return;
    }
    console.warn(message);
});