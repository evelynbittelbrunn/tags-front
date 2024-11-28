import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthLayout from './AuthLayout';

// Enum simulado para Auth
const Auth = {
    LOGIN: 'LOGIN',
    REGISTER: 'REGISTER',
};

describe('AuthLayout Component', () => {
    it('renders register layout correctly', () => {
        render(
            <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
                <AuthLayout type={Auth.REGISTER}>
                    <div>Register Form</div>
                </AuthLayout>
            </MemoryRouter>
        );

        // Verifica o título do layout
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Criar uma conta');
        // Verifica o texto para fazer login
        expect(screen.getByText(/Já tem uma conta\?/i)).toBeInTheDocument();
        // Verifica o formulário de cadastro
        expect(screen.getByText('Register Form')).toBeInTheDocument();
    });
});
