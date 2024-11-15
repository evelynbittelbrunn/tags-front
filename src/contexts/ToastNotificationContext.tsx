import React, { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import ToastNotification from '../components/toastNotification/ToastNotification';

type NotificationContextType = {
    showNotification: (message: string, type?: 'success' | 'error' | 'warning') => void;
};

type NotificationProviderProps = {
    children: ReactNode;
};

type Notification = {
    message: string;
    type: 'success' | 'error' | 'warning' | '';
    isVisible: boolean;
};

export const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType);

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
    const [notification, setNotification] = useState<Notification>({
        message: '',
        type: '',
        isVisible: false,
    });

    const showNotification = useCallback((message: string, type: 'success' | 'error' | 'warning' = 'success') => {
        setNotification({ message, type, isVisible: true });
    }, []);

    const closeNotification = useCallback(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {children}
            <ToastNotification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={closeNotification}
            />
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
