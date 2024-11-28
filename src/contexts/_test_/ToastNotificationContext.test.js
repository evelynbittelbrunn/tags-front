import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NotificationContext, NotificationProvider } from '../ToastNotificationContext';

// Componente de Teste para usar o contexto
const TestComponent = () => {
    const { showNotification } = React.useContext(NotificationContext);

    return (
        <div>
            <button onClick={() => showNotification('Test success message', 'success')}>
                Show Success Notification
            </button>
            <button onClick={() => showNotification('Test error message', 'error')}>
                Show Error Notification
            </button>
        </div>
    );
};

describe('NotificationContext', () => {
    it('renders notification when showNotification is called', async () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        // Simula o clique para mostrar uma notificação de sucesso
        fireEvent.click(screen.getByText('Show Success Notification'));

        // Espera a notificação ser exibida
        await waitFor(() => screen.getByText('Test success message'));

        // Verifique se a mensagem da notificação aparece corretamente
        expect(screen.getByText('Test success message')).toBeInTheDocument();
    });

    it('renders error notification when showNotification is called with error type', async () => {
        render(
            <NotificationProvider>
                <TestComponent />
            </NotificationProvider>
        );

        // Simula o clique para mostrar uma notificação de erro
        fireEvent.click(screen.getByText('Show Error Notification'));

        // Espera a notificação ser exibida
        await waitFor(() => screen.getByText('Test error message'));

        // Verifique se a mensagem da notificação de erro aparece corretamente
        expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

});
