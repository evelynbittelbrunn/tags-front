import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Comment from './Comment';
import axios from 'axios';

jest.mock('axios');
const mockDelete = axios.delete;

describe('Comment Component', () => {
    const mockSetComments = jest.fn();
    const mockSetTotalComments = jest.fn();

    const comment = {
        id: '1',
        content: 'This is a comment',
        user: {
            id: 'user1',
            name: 'John Doe',
            profilePicture: 'http://example.com/profile.jpg',
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the comment properly', () => {
        render(
            <Router>
                <Comment
                    comment={comment}
                    currentUser="user1"
                    setComments={mockSetComments}
                    setTotalComments={mockSetTotalComments}
                />
            </Router>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('This is a comment')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'John Doe' })).toHaveAttribute('href', '/perfil/user1');
        expect(screen.getByRole('img')).toHaveAttribute(
            'src',
            expect.stringContaining('http://example.com/profile.jpg')
        );
    });

    it('calls deleteComment when delete button is clicked', async () => {
        mockDelete.mockResolvedValueOnce({ status: 200 });

        render(
            <Router>
                <Comment
                    comment={comment}
                    currentUser="user1"
                    setComments={mockSetComments}
                    setTotalComments={mockSetTotalComments}
                />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /tree dots icon/i }));

        const deleteButton = screen.getByRole('button', { name: /Excluir/i });
        fireEvent.click(deleteButton);

        await waitFor(() =>
            expect(mockDelete).toHaveBeenCalledWith('/tags/comments/1', expect.any(Object))
        );

        expect(mockSetComments).toHaveBeenCalled();
        expect(mockSetTotalComments).toHaveBeenCalledWith(expect.any(Function));
    });

    it('handles errors gracefully when delete fails', async () => {
        mockDelete.mockRejectedValueOnce(new Error('Failed to delete'));

        render(
            <Router>
                <Comment
                    comment={comment}
                    currentUser="user1"
                    setComments={mockSetComments}
                    setTotalComments={mockSetTotalComments}
                />
            </Router>
        );

        fireEvent.click(screen.getByRole('button', { name: /tree dots icon/i }));

        const deleteButton = screen.getByRole('button', { name: /Excluir/i });
        fireEvent.click(deleteButton);

        await waitFor(() =>
            expect(mockDelete).toHaveBeenCalledWith('/tags/comments/1', expect.any(Object))
        );

        expect(mockSetComments).not.toHaveBeenCalled();
        expect(mockSetTotalComments).not.toHaveBeenCalled();
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

jest.spyOn(console, 'log').mockImplementation((message) => {
    if (message.includes('Failed to delete')) {
        return;  // Não exibe essa mensagem no console
    }
    console.log(message);  // Para outras mensagens, exibe normalmente
});

