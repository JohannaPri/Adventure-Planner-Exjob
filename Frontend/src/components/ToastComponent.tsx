import React, { useEffect, useState } from 'react';
import { Warning, Info, Check } from "@phosphor-icons/react";
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface ToastProps {
    message: string;
    type?: 'success' | 'error' | 'info';
    onClose: () => void;
}

const ToastComponent: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
    const [isVisible, setIsVisible] = useState(true);
    const toast = useSelector((state: RootState) => state.toast);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);

            setTimeout(() => onClose(), 500);
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const toastStyles = {
        success: 'bg-white',
        error: 'bg-white',
        info: 'bg-white',
    };

    if (!toast) return null;

    return (
        <div 
        className={`z-50 fixed bottom-5 right-5 transform transition-all duration-500 ease-in-out ${
            isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-full opacity-0'
        } max-w-xs w-full px-6 py-4 rounded-xl text-slateGray shadow-xl ring-1 ring-cloudGray ring-opacity-10 ${toastStyles[type]}`}
        >
            <div className="flex items-center space-x-4">
                <div className="text-2xl">
                    {type === 'success' && <span><Check /></span>}
                    {type === 'error' && <span><Warning /></span>}
                    {type === 'info' && <span><Info /></span>}
                </div>
                <div className="flex-1 text-sm font-semibold">{message}</div>
                <button
                    className="ml-4 text-slateGray hover:text-gray-500 focus:outline-none"
                    onClick={() => { setIsVisible(false); onClose(); }}>
                    ✖️
                </button>
            </div>
        </div>
    );
}

export default ToastComponent;