import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { UserContext } from '../../contexts/UserContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: jest.fn(({ to }) => <div>{`Redirecting to ${to}`}</div>), // Mock do Navigate com texto verificável
}));

describe('ProtectedRoute Component', () => {
    const TestComponent = () => <div>Protected Content</div>;

    it('renders children when the user is logged in', () => {
        const contextValue = { login: true };

        const { getByText } = render(
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <TestComponent />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        );

        expect(getByText('Protected Content')).toBeInTheDocument();
    });

    it('renders nothing when login state is undefined', () => {
        const contextValue = { login: undefined };

        const { container } = render(
            <UserContext.Provider value={contextValue}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <TestComponent />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        );

        expect(container.firstChild).toBeNull(); // Verifica se nada foi renderizado
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