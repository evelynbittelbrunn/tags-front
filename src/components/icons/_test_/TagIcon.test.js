import { render } from '@testing-library/react';
import TagIcon from '../TagIcon'; // Ajuste o caminho conforme necessário

describe('TagIcon Component', () => {
    test('renders TagIcon SVG', () => {
        const { container } = render(<TagIcon />);
        const svgElement = container.querySelector('svg');
        expect(svgElement).toBeInTheDocument();
        expect(svgElement).toHaveAttribute('viewBox', '0 0 24 24');
        expect(svgElement).toHaveAttribute('width', '30');
        expect(svgElement).toHaveClass('size-6');
    });
});
