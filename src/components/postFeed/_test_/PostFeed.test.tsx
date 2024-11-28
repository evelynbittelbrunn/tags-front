import React from 'react';
import axios from 'axios';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PostFeed from '../PostFeed';

jest.mock('axios');

jest.mock('date-fns', () => ({
    formatDistanceToNow: jest.fn(() => ''), // Mock retornando string vazia
}));

jest.mock('date-fns/locale', () => ({
    ptBR: {},
}));

jest.mock('antd/es/input/TextArea', () => {
    return jest.fn(() => <textarea />);
});

describe('PostFeed Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        (axios.get as jest.Mock).mockResolvedValueOnce({
            data: [],
        });

        render(
            <MemoryRouter>
                <PostFeed isProfileFeed={false} getPosts={jest.fn()} />
            </MemoryRouter>
        );
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