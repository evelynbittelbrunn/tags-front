import React from 'react';
import { render, screen } from '@testing-library/react';
import AddIcon from '../AddIcon';

describe('AddIcon Component', () => {
    test('renders AddIcon SVG', () => {
        const { container } = render(<AddIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
    });
});
