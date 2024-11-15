import React, { useEffect, useState } from 'react';
import './styles.css';

const ToastNotification = ({
    message,
    type = 'success',
    isVisible,
    onClose,
}: IToastNotification) => {

    const [isExiting, setIsExiting] = useState(false); 

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (isVisible) {
            setIsExiting(false); 
            timer = setTimeout(() => {
                setIsExiting(true);
            }, 3000); 
        } else if (!isVisible && isExiting) {
            setTimeout(onClose, 300); 
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isVisible, isExiting, onClose]);

    return (
        <div
            className={`footer-notification ${isVisible && !isExiting ? 'show' : ''} ${isExiting ? 'hide' : ''} ${type}`}
        >
            <p>{message}</p>
        </div>
    );
}

export default ToastNotification;
