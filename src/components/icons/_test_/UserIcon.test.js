import React from 'react';
import { render } from '@testing-library/react';
import UserIcon from '../UserIcon';

describe('UserIcon Component', () => {
    test('renders UserIcon SVG', () => {
        const { container } = render(<UserIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('width', '20');
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('fill', 'none');
        expect(svgElement).toHaveAttribute('stroke', 'currentColor');
        expect(svgElement).toHaveClass('size-6');

        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();
        expect(pathElement).toHaveAttribute(
            'd',
            'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
        );
    });
});
