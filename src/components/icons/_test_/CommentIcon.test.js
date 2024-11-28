import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CommentIcon from '../CommentIcon';

describe('CommentIcon Component', () => {
    test('renders CommentIcon SVG and triggers setOpen onClick', () => {
        const mockSetOpen = jest.fn(); // Mock da função setOpen
        const { container } = render(<CommentIcon setOpen={mockSetOpen} />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument(); // Verifica se o SVG está no documento
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24'); // Verifica o atributo viewBox
        expect(svgElement).toHaveAttribute('width', '25'); // Verifica a largura do SVG

        // Simula o clique no SVG
        fireEvent.click(svgElement);

        // Verifica se a função mockSetOpen foi chamada com o argumento correto
        expect(mockSetOpen).toHaveBeenCalledWith(true);
        expect(mockSetOpen).toHaveBeenCalledTimes(1);
    });
});
