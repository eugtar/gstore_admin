"use client";

import { useStoreModal } from "@/hooks";
import { FC, useEffect } from "react";

const SetupPage: FC = () => {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
