import React from 'react';
import { render } from '@testing-library/react';
import EditIcon from '../EditIcon';

describe('EditIcon Component', () => {
    test('renders EditIcon SVG', () => {
        const { container } = render(<EditIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '28');

        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
});
