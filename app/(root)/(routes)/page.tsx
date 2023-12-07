"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useStoreModal } from "@/hooks/use-store-modal";

const SetupPage = () => {
  const [isMouted, setIsMouted] = useState(false)
  useEffect(() => {
    setIsMouted(true)
  }, [])

  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);


  if (!isOpen) {
    onOpen();
  }

  return null;
};

export default SetupPage;
