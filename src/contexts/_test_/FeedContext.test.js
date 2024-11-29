import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import do Router
import { FeedProvider, useFeedContext } from '../FeedContext';

// Mock do useNavigate (se necessário)
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

// Componente de Teste para usar o contexto
const TestComponent = () => {
    const { feedKey, profileFeedKey, refreshFeed, refreshProfileFeed } = useFeedContext();

    return (
        <div>
            <div>
                <span data-testid="feedKey">{feedKey}</span>
                <button onClick={refreshFeed} data-testid="refreshFeedButton">
                    Refresh Feed
                </button>
            </div>
            <div>
                <span data-testid="profileFeedKey">{profileFeedKey}</span>
                <button onClick={refreshProfileFeed} data-testid="refreshProfileFeedButton">
                    Refresh Profile Feed
                </button>
            </div>
        </div>
    );
};

describe('FeedContext', () => {
    it('provides initial values correctly', () => {
        render(
            <Router>
                <FeedProvider>
                    <TestComponent />
                </FeedProvider>
            </Router>
        );

        // Verifica se os valores iniciais das chaves são iguais a '0'
        expect(screen.getByTestId('feedKey')).toHaveTextContent('0');
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('0');
    });

    it('increments feedKey correctly when refreshFeed is called', () => {
        render(
            <Router>
                <FeedProvider>
                    <TestComponent />
                </FeedProvider>
            </Router>
        );

        // Confirma o valor inicial de feedKey
        expect(screen.getByTestId('feedKey')).toHaveTextContent('0');

        // Simula a chamada para refreshFeed
        fireEvent.click(screen.getByTestId('refreshFeedButton'));

        // Verifica se feedKey foi incrementado
        expect(screen.getByTestId('feedKey')).toHaveTextContent('1');
    });

    it('increments profileFeedKey correctly when refreshProfileFeed is called', () => {
        render(
            <Router>
                <FeedProvider>
                    <TestComponent />
                </FeedProvider>
            </Router>
        );

        // Confirma o valor inicial de profileFeedKey
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('0');

        // Simula a chamada para refreshProfileFeed
        fireEvent.click(screen.getByTestId('refreshProfileFeedButton'));

        // Verifica se profileFeedKey foi incrementado
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('1');
    });
});
