'use client';

import React from 'react';
import { ReactNode } from 'react';
import {
    Notification,
    NotificationContent,
    NotificationDescription,
    NotificationTitle,
  } from 'keep-react';
  import { Info } from '@phosphor-icons/react';

  interface NotificationComponentProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    icon?: ReactNode;
  }

  export const NotificationComponent: React.FC<NotificationComponentProps> = ({
    title,
    description,
    isOpen,
    onClose,
    icon,
  }) => {
    return (
        <Notification
            open={isOpen}
            onOpenChange={(newOpenState) => {
                if (!newOpenState) onClose();
            }}
            showCloseIcon={false}
        >
            <NotificationContent className="max-w-xs rounded-xl p-4 bg-white dark:bg-gray-800 text-center shadow-lg">
                <div className="flex justify-center mb-4">
                    <div className="flex items-center justify-center w-20 h-20 border rounded-full border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
                        {icon || <Info size={60} />}
                    </div>
                </div>

                <div className="space-y-2 text-center">
                    <NotificationTitle className="text-lg font-semibold">{title}</NotificationTitle>
                    <NotificationDescription className="text-sm text-gray-500 dark:text-gray-300">
                        {description}
                    </NotificationDescription>
                </div>
            </NotificationContent>
        </Notification>
    );
  }

  



