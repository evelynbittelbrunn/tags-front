import React from 'react';
import { render } from '@testing-library/react';
import SearchIcon from '../SearchIcon';

describe('SearchIcon Component', () => {
    test('renders SearchIcon SVG', () => {
        const { container } = render(<SearchIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '15');
        expect(svgElement).toHaveAttribute('stroke', 'currentColor');

        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
        expect(pathElement).toHaveAttribute(
            'd',
            'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
        );
    });
});
