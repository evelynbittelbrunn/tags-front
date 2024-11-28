import { render, screen, fireEvent } from '@testing-library/react';
import { FeedProvider, useFeedContext } from '../FeedContext';

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
            <FeedProvider>
                <TestComponent />
            </FeedProvider>
        );

        // Verifique se as chaves iniciais são 0
        expect(screen.getByTestId('feedKey')).toHaveTextContent('0');
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('0');
    });

    it('refreshes the feed key when refreshFeed is called', () => {
        render(
            <FeedProvider>
                <TestComponent />
            </FeedProvider>
        );

        // Verifique o estado inicial
        expect(screen.getByTestId('feedKey')).toHaveTextContent('0');

        // Simula a atualização
        fireEvent.click(screen.getByTestId('refreshFeedButton'));

        // Verifique se o feedKey foi incrementado
        expect(screen.getByTestId('feedKey')).toHaveTextContent('1');
    });

    it('refreshes the profile feed key when refreshProfileFeed is called', () => {
        render(
            <FeedProvider>
                <TestComponent />
            </FeedProvider>
        );

        // Verifique o estado inicial
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('0');

        // Simula a atualização
        fireEvent.click(screen.getByTestId('refreshProfileFeedButton'));

        // Verifique se o profileFeedKey foi incrementado
        expect(screen.getByTestId('profileFeedKey')).toHaveTextContent('1');
    });
});
