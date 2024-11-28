import React from 'react';
import { render } from '@testing-library/react';
import CheckIcon from '../CheckIcon';

describe('CheckIcon Component', () => {
    test('renders CheckIcon SVG', () => {
        const { container } = render(<CheckIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '25');
    });
});
