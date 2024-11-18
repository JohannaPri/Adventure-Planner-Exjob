'use client'
import { Check } from "@phosphor-icons/react";
import {
  Button,
  Modal,
  ModalAction,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from 'keep-react'

export const ModalComponent = () => {
  return (
    <Modal>
      <ModalAction asChild>
        <Button>Open Modal</Button>
      </ModalAction>
      <ModalContent className="max-w-[20rem] lg:max-w-[26rem]">
        <ModalHeader className="mb-6 flex flex-col items-center justify-center space-y-3">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-metal-100 bg-metal-50 text-metal-600 dark:border-metal-800 dark:bg-metal-800 dark:text-white">
            <Check size={60} />
          </div>
          <div className="space-y-1 text-center">
            <ModalTitle>TITLE</ModalTitle>
            <ModalDescription>
              TEXT
            </ModalDescription>
          </div>
        </ModalHeader>
        <ModalFooter className="justify-center">
          <Button>Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}