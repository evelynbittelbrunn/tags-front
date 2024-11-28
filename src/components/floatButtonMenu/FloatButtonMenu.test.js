import { render, screen, fireEvent } from '@testing-library/react';
import FloatButtonMenu from './FloatButtonMenu';

describe('FloatButtonMenu Component', () => {
    it('renders FloatButtonMenu with buttons', () => {
        const mockSetOpenNewPostModal = jest.fn();
        const mockSetOpenTagsModal = jest.fn();

        render(
            <FloatButtonMenu
                setOpenNewPostModal={mockSetOpenNewPostModal}
                setOpenTagsModal={mockSetOpenTagsModal}
            />
        );

        // Verifica se o botão principal (com ícone de "+" - PlusOutlined) está presente
        const mainButton = screen.getByRole('button', { name: /plus/i });
        expect(mainButton).toBeInTheDocument();

        // Simula clique no botão principal
        fireEvent.click(mainButton);

        // Verifica se os botões secundários (ícones FormOutlined e TagOutlined) são renderizados
        const postButton = screen.getByRole('button', { name: /form/i });
        const tagsButton = screen.getByRole('button', { name: /tag/i });
        expect(postButton).toBeInTheDocument();
        expect(tagsButton).toBeInTheDocument();

        // Simula clique nos botões secundários
        fireEvent.click(postButton);
        expect(mockSetOpenNewPostModal).toHaveBeenCalledTimes(1);

        fireEvent.click(tagsButton);
        expect(mockSetOpenTagsModal).toHaveBeenCalledTimes(1);
    });
});
