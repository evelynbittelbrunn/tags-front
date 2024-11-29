import { render, screen } from '@testing-library/react';
import NoPosts from '../components/NoPosts'; // Ajuste o caminho conforme necessário

describe('NoPosts Component', () => {
    test('renders the container with the correct class', () => {
        const { container } = render(<NoPosts />);
        const divElement = container.querySelector('.no-posts-container');
        expect(divElement).toBeInTheDocument();
    });

    test('renders the TagIcon component', () => {
        render(<NoPosts />);
        const svgElement = screen.getByRole('img', { hidden: true }); // Assume que o SVG seja identificado como imagem no DOM
        expect(svgElement).toBeInTheDocument();
    });

    test('renders the text messages', () => {
        render(<NoPosts />);
        expect(screen.getByText('Não há posts no momento.')).toBeInTheDocument();
        expect(screen.getByText('Adicione tags ou conecte-se com pessoas novas para começar a interagir!')).toBeInTheDocument();
    });
});
