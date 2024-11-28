import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostAuthor from '../components/PostAuthor';

jest.mock('../../profilePicture/ProfilePicture', () => () => <div data-testid="mocked-profile-picture"></div>);
jest.mock('../../timeAgo/TimeAgo', () => () => <div data-testid="mocked-time-ago"></div>);

describe('PostAuthor Component', () => {
    const mockUser = {
        id: '123',
        name: 'John Doe',
        profilePicture: 'path/to/profilePicture.jpg',
    };
    const mockCreatedAt = '2024-11-27T12:00:00Z';

    it('renders author information correctly', () => {
        render(
            <MemoryRouter>
                <PostAuthor user={mockUser} createdAt={mockCreatedAt} />
            </MemoryRouter>
        );

        // Verifica se o nome do autor está sendo exibido
        const authorName = screen.getByText('John Doe');
        expect(authorName).toBeInTheDocument();

        // Verifica se o link para o perfil do autor está correto
        const authorLink = screen.getByRole('link', { name: 'John Doe' });
        expect(authorLink).toHaveAttribute('href', '/perfil/123');

        // Verifica se o componente ProfilePicture foi renderizado
        expect(screen.getByTestId('mocked-profile-picture')).toBeInTheDocument();

        // Verifica se o componente TimeAgo foi renderizado
        expect(screen.getByTestId('mocked-time-ago')).toBeInTheDocument();
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