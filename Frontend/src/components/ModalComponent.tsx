'use client';
import { ReactNode } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react';
import { Info } from '@phosphor-icons/react';

interface ModalComponentProps {
  title: string;
  description: string;
  confirmText: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  icon?: ReactNode;
}

export const ModalComponent: React.FC<ModalComponentProps> = ({
  title,
  description,
  confirmText,
  isOpen,
  onClose,
  onConfirm,
  icon,
}) => {
  return (
    <Modal open={isOpen} onOpenChange={(newOpenState) => {if (!newOpenState) onClose()}}>
      <ModalContent className="max-w-[30rem] lg:max-w-[30rem] w-screen">
        <ModalHeader className="flex flex-col items-center justify-center mb-6 space-y-3">
          <div className="flex items-center justify-center w-20 h-20 border rounded-full border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
            {icon || <Info size={60} />}
          </div>
          <div className="space-y-1 text-center">
            <ModalTitle>{title}</ModalTitle>
            <ModalDescription>{description}</ModalDescription>
          </div>
        </ModalHeader>
        <ModalFooter className="justify-center">
          <Button 
            className="px-5 py-3 text-white font-medium transition-all duration-300 ease-in border-none shadow-md outline-none rounded-1 lg:px-7 bg-slateGray hover:shadow-none hover:bg-black hover:text-white hover:border-gray-950" 
            onClick={onConfirm}>{confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};