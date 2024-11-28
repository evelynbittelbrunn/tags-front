export interface IToastNotification {
    message: string;
    type?: 'success' | 'error' | 'warning' | '';
    isVisible: boolean;
    onClose: () => void;
}