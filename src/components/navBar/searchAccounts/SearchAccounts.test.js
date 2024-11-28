import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchAccounts from './SearchAccounts';

describe('SearchAccounts Component', () => {
    it('renders the search input', () => {
        render(
            <MemoryRouter>
                <SearchAccounts />
            </MemoryRouter>
        );

        // Verifica se o input de busca foi renderizado
        const searchInput = screen.getByPlaceholderText('Busque por usuários');
        expect(searchInput).toBeInTheDocument();
    });
});


global.window.matchMedia = global.window.matchMedia || function () {
    return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    };
};

describe('SearchAccounts Component', () => {
    it('renders the search input', () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true }}>
                <SearchAccounts />
            </MemoryRouter>
        );

        // Verifica se o campo de busca foi renderizado corretamente
        expect(screen.getByPlaceholderText(/busque por usuários/i)).toBeInTheDocument();
    });
});

jest.spyOn(console, 'warn').mockImplementation((message) => {
    if (
        message.includes('React Router Future Flag Warning') || 
        message.includes('Relative route resolution within Splat routes')
    ) {
        return; // Ignora esses warnings específicos
    }
    console.warn(message);
});
