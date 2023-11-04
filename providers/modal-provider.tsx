"use client";

import { FC, useEffect, useState } from "react";
import StoreModal from "@/components/modals/store-modal";

const ModalProvider: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted((prev) => (prev = true));
  }, []);

  if (!isMounted) return null;
  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
