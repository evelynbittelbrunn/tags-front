import React from 'react';
import { render } from '@testing-library/react';
import RemoveIcon from '../RemoveIcon';

describe('RemoveIcon Component', () => {
    test('renders RemoveIcon SVG', () => {
        const { container } = render(<RemoveIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '18');
        expect(svgElement).toHaveAttribute('stroke', 'red');

        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
    });
});
