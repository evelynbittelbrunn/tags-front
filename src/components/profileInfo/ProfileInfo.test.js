import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileInfo from './ProfileInfo';
import axios from 'axios';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock do axios
jest.mock('axios');
const mockPost = axios.post;

// Mock do localStorage
beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', 'mockUserId');
});

// Mock dos dados do perfil
const mockProfileData = {
    name: 'Test User',
    bio: 'This is a test bio.',
    profilePicture: 'data:image/jpeg;base64,test-pic.jpg',
    following: false,
    followingCount: 10,
};

const mockSetTotalFollowers = jest.fn();

describe('ProfileInfo Component', () => {
    it('renders profile data correctly', () => {
        render(
            <Router>
                <ProfileInfo
                    profileData={mockProfileData}
                    isCurrentUser={false}
                    otherUserId="123"
                    totalFollowers={5}
                    setTotalFollowers={mockSetTotalFollowers}
                    isLoadingUserData={false}
                />
            </Router>
        );

        // Verifica o conteúdo renderizado
        expect(screen.getByText('Test User')).toBeInTheDocument();
        expect(screen.getByText('This is a test bio.')).toBeInTheDocument();

        // Matcher flexível para "5 seguidores"
        expect(
            screen.getByText((content, element) => {
                const hasText = (node) => node.textContent === '5 seguidores';
                const elementMatches = hasText(element);
                const childrenDontMatch = Array.from(element?.children || []).every(
                    (child) => !hasText(child)
                );
                return elementMatches && childrenDontMatch;
            })
        ).toBeInTheDocument();

        // Matcher flexível para "10 seguindo"
        expect(
            screen.getByText((content, element) => {
                const hasText = (node) => node.textContent === '10 seguindo';
                const elementMatches = hasText(element);
                const childrenDontMatch = Array.from(element?.children || []).every(
                    (child) => !hasText(child)
                );
                return elementMatches && childrenDontMatch;
            })
        ).toBeInTheDocument();
    });

    it('handles follow user action', async () => {
        // Configura o mock do axios.post
        mockPost.mockResolvedValueOnce({
            status: 200,
            data: { isFollowing: true },
        });
    
        render(
            <Router>
                <ProfileInfo
                    profileData={mockProfileData}
                    isCurrentUser={false}
                    otherUserId="123"
                    totalFollowers={5}
                    setTotalFollowers={mockSetTotalFollowers}
                    isLoadingUserData={false}
                />
            </Router>
        );
    
        // Verifica se o botão "Seguir" está presente
        const followButton = screen.getByText('Seguir');
        expect(followButton).toBeInTheDocument();
    
        // Simula o clique no botão
        fireEvent.click(followButton);
    
        // Aguarda até que o botão seja atualizado para "Seguindo"
        await waitFor(() => {
            expect(screen.getByText('Seguindo')).toBeInTheDocument();
        });
    
        // Verifica se o mock do setTotalFollowers foi chamado
        expect(mockSetTotalFollowers).toHaveBeenCalledWith(6);
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