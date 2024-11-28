import React from 'react';
import { render } from '@testing-library/react';
import SendIcon from '../SendIcon';

describe('SendIcon Component', () => {
    test('renders SendIcon SVG', () => {
        const { container } = render(<SendIcon />);

        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '15');
        expect(svgElement).toHaveAttribute('stroke', 'currentColor');

        const pathElement = container.querySelector('path');
        expect(pathElement).toBeInTheDocument();

        expect(pathElement).toHaveAttribute(
            'd',
            'M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5'
        );
    });
});
