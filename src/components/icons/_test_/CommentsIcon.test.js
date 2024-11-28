import React from 'react';
import { render } from '@testing-library/react';
import CommentsIcon from '../CommentsIcon';

describe('CommentsIcon Component', () => {
    test('renders CommentsIcon SVG', () => {
        const { container } = render(<CommentsIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '30');

        // Verifique se o path está presente sem validar atributos diretamente
        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
        
    });
});
