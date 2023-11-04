import { create } from "zustand";

interface IUseCategoryModalStore {
  isOpen: boolean;
  isEdit: boolean;
  editId?: string;
  onOpen: () => void;
  onClose: () => void;
  onEdit: (id: string) => void;
}

const useCategoryModal = create<IUseCategoryModalStore>((set) => {
  return {
    isOpen: false,
    isEdit: false,
    editId: undefined,
    onOpen() {
      set({ isOpen: true });
    },
    onClose() {
      set({ isOpen: false, isEdit: false, editId: undefined });
    },
    onEdit(id: string) {
      set({ isOpen: true, isEdit: true, editId: id });
    },
  };
});

export default useCategoryModal;
