import React, { useEffect, useState } from 'react';
import './styles.css';
import CheckIcon from '../icons/CheckIcon';

const ToastNotification = ({
    message,
    type = 'success',
    isVisible,
    onClose,
}: IToastNotification) => {

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                setTimeout(onClose, 300);
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div
            className={`footer-notification ${show ? 'show' : 'hide'} ${type}`}
        >
            <CheckIcon />
            <p>{message}</p>
        </div>
    );
}

export default ToastNotification;
