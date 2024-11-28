import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToastNotification from './ToastNotification';

describe('ToastNotification Component', () => {
    it('renders without crashing', () => {
        render(
            <ToastNotification
                message="This is a test message"
                type="success"
                isVisible={true}
                onClose={() => {}}
            />
        );
    });

    it('displays the correct message', () => {
        render(
            <ToastNotification
                message="This is a test message"
                type="success"
                isVisible={true}
                onClose={() => {}}
            />
        );

        expect(screen.getByText('This is a test message')).toBeInTheDocument();
    });

    it('applies the correct type class', () => {
        const { container } = render(
            <ToastNotification
                message="This is a test message"
                type="success"
                isVisible={true}
                onClose={() => {}}
            />
        );

        expect(container.firstChild).toHaveClass('success');
    });
});
