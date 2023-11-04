"use client";

import Modal from "@/components/ui/modal";
import { FC, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface IAlertModal {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const AlertModal: FC<IAlertModal> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Modal
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          title="Cancel"
          disabled={loading}
          variant={"outline"}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          title="Continue"
          disabled={loading}
          variant={"destructive"}
          onClick={onConfirm}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};

export default AlertModal;
