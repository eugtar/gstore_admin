"use client";

import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./dialog";

interface IModalProps {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: FC<IModalProps> = ({
  description,
  isOpen,
  onClose,
  title,
  children,
}) => {
  const onChange = (open: boolean) => {
    !open && onClose();
  };
  return (
    <section aria-label="modal_window">
      <Dialog open={isOpen} onOpenChange={onChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Modal;
