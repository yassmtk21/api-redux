import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return { open, closeModal, openModal };
};

export default useModal;
